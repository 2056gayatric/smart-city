const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");

// Load env FIRST (important)
dotenv.config();

// DB Connections
const CONNECT_MONGO = require("./config/mongo");
const db = require("./config/db"); // MySQL connection

// Middlewares
const { ERROR_HANDLER } = require("./middlewares/error_middlewares");
const { AUTH_MIDDLEWARE } = require("./middlewares/auth_middlewares");

const app = express();
const PORT = process.env.PORT || 3070;

(async () => {
    try {
        // ======================
        // CONNECT DATABASES
        // ======================
        await CONNECT_MONGO();
        // MySQL auto-connects when imported

        // ======================
        // GLOBAL MIDDLEWARES
        // ======================
        app.use(cors());
        app.use(cookieParser());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        // ======================
        // STATIC FILES
        // ======================
        app.use("/uploads", express.static(path.join(__dirname, "uploads")));
        app.use("/public", express.static(path.join(__dirname, "public")));

        // ======================
        // VIEW ENGINE
        // ======================
        app.set("view engine", "ejs");
        app.set("views", path.join(__dirname, "views"));

        // ======================
        // ROUTES
        // ======================
        app.use("/", require("./routes/home"));
        app.use("/login", require("./routes/login"));
        app.use("/citizen", require("./routes/citizen"));
        app.use("/government", require("./routes/government"));
        app.use("/hospital", require("./routes/hospital"));
        app.use("/court", require("./routes/court"));
        app.use("/transport", require("./routes/transpose"));

        // ======================
        // ERROR HANDLER
        // ======================
        app.use(ERROR_HANDLER);

        // ======================
        // START SERVER
        // ======================
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("❌ Server startup failed:", error.message);
        process.exit(1);
    }
})();
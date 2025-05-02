/*const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

// Step 1: Redirect user to Google for authentication
router.get("/google", (req, res) => {
  const redirectUri = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(process.env.GOOGLE_REDIRECT_URI)}&` +
    `response_type=code&` +
    `scope=openid email profile&` +
    `access_type=offline&prompt=consent`;

  res.redirect(redirectUri);
});

// Step 2: Google redirects back with a code -> exchange it for tokens
router.get("/google/callback", async (req, res) => {
  const code = req.query.code;
  const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";

  if (!code) {
    console.error("Error: Missing code in query parameters.");
    return res.redirect(`${clientUrl}/login?error=missing_code`);
  }

  try {
    // Exchange authorization code for tokens
    const tokenResponse = await axios.post("https://oauth2.googleapis.com/token", null, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      params: {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      },
    });

    const { id_token } = tokenResponse.data;
    if (!id_token) {
      console.error("Error: No ID token found in the response.");
      throw new Error("No ID token in response");
    }

    // Decode user info from ID token
    const decoded = jwt.decode(id_token);
    if (!decoded || !decoded.email) {
      console.error("Error: Invalid token payload.");
      throw new Error("Invalid token payload");
    }

    const user = {
      googleId: decoded.sub,
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    };

    // Generate your app's JWT token
    const appToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Redirect user to frontend with token
    const redirectWithToken = `${clientUrl}/oauth-success?token=${encodeURIComponent(appToken)}`;
    res.redirect(redirectWithToken);
  } catch (err) {
    console.error("OAuth error:", err.response?.data || err.message);
    res.redirect(`${clientUrl}/login?error=oauth_failed`);
  }
});

module.exports = router;

*/

const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

// === GOOGLE LOGIN ===
router.get("/google", (req, res) => {
  const redirectUri = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(process.env.GOOGLE_REDIRECT_URI)}&` +
    `response_type=code&` +
    `scope=openid email profile&` +
    `access_type=offline&prompt=consent`;

  res.redirect(redirectUri);
});

router.get("/google/callback", async (req, res) => {
  const code = req.query.code;
  const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";

  if (!code) {
    console.error("Error: Missing code in query parameters.");
    return res.redirect(`${clientUrl}/login?error=missing_code`);
  }

  try {
    const tokenResponse = await axios.post("https://oauth2.googleapis.com/token", null, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      params: {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      },
    });

    const { id_token } = tokenResponse.data;
    if (!id_token) throw new Error("No ID token in response");

    const decoded = jwt.decode(id_token);
    if (!decoded || !decoded.email) throw new Error("Invalid token payload");

    const user = {
      googleId: decoded.sub,
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    };

    const appToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

    const redirectWithToken = `${clientUrl}/oauth-success?token=${encodeURIComponent(appToken)}`;
    res.redirect(redirectWithToken);
  } catch (err) {
    console.error("OAuth error:", err.response?.data || err.message);
    res.redirect(`${clientUrl}/login?error=oauth_failed`);
  }
});

// === FACEBOOK LOGIN ===
router.get("/facebook", (req, res) => {
  const redirectUri = `https://www.facebook.com/v17.0/dialog/oauth?` +
    `client_id=${process.env.FACEBOOK_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(process.env.FACEBOOK_REDIRECT_URI)}&` +
    `scope=email,public_profile&response_type=code`;

  res.redirect(redirectUri);
});

router.get("/facebook/callback", async (req, res) => {
  const code = req.query.code;
  const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";

  if (!code) {
    console.error("Error: Missing Facebook code");
    return res.redirect(`${clientUrl}/login?error=missing_code`);
  }

  try {
    // Exchange code for access token
    const tokenResponse = await axios.get("https://graph.facebook.com/v17.0/oauth/access_token", {
      params: {
        client_id: process.env.FACEBOOK_CLIENT_ID,
        client_secret: process.env.FACEBOOK_CLIENT_SECRET,
        redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
        code,
      },
    });

    const { access_token } = tokenResponse.data;
    if (!access_token) throw new Error("No access token");

    // Fetch user info
    const userInfoResponse = await axios.get("https://graph.facebook.com/me", {
      params: {
        access_token,
        fields: "id,name,email,picture",
      },
    });

    const { id, name, email, picture } = userInfoResponse.data;

    const user = {
      facebookId: id,
      name,
      email,
      picture: picture?.data?.url,
    };

    const appToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

    const redirectWithToken = `${clientUrl}/oauth-success?token=${encodeURIComponent(appToken)}`;
    res.redirect(redirectWithToken);
  } catch (err) {
    console.error("Facebook OAuth error:", err.response?.data || err.message);
    res.redirect(`${clientUrl}/login?error=facebook_oauth_failed`);
  }
});

module.exports = router;

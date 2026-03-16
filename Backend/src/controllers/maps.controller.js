module.exports.getSuggestions = async (req, res) => {
    try {
        const { input } = req.query;
        if (!input) {
            return res.status(400).json({ message: "Input query is required" });
        }

        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(input)}&format=json&limit=5`;
        const response = await fetch(url, {
            headers: {
                "User-Agent": "UberCloneApp/1.0" // Nominatim requires a user agent
            }
        });

        if (!response.ok) {
            throw new Error(`Nominatim API error: ${response.status}`);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (err) {
        console.error("Geocoding proxy error:", err);
        res.status(500).json({ message: "Geocoding failed" });
    }
};

module.exports.getReverseGeocode = async (req, res) => {
    try {
        const { lat, lon } = req.query;
        if (!lat || !lon) {
            return res.status(400).json({ message: "Latitude and longitude are required" });
        }

        const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
        const response = await fetch(url, {
            headers: {
                "User-Agent": "UberCloneApp/1.0"
            }
        });

        if (!response.ok) {
            throw new Error(`Nominatim API error: ${response.status}`);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (err) {
        console.error("Reverse geocoding proxy error:", err);
        res.status(500).json({ message: "Reverse geocoding failed" });
    }
};

module.exports.getSuggestions = async (req, res) => {
    try {
        const { input } = req.query;
        if (!input) {
            return res.status(400).json({ message: "Input query is required" });
        }

        const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(input)}&limit=5&lang=en&bbox=68.111379,6.753516,97.395561,35.674546`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Photon API error: ${response.status}`);
        }

        const data = await response.json();
        // Format photon geojson to match what frontend expects
        const formattedData = (data.features || []).map(f => {
            const props = f.properties || {};
            const addressParts = [props.name, props.street, props.city, props.state, props.country].filter(Boolean);
            return {
                display_name: addressParts.join(', '),
                lat: f.geometry.coordinates[1].toString(),
                lon: f.geometry.coordinates[0].toString()
            };
        });
        res.status(200).json(formattedData);
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

        const url = `https://photon.komoot.io/reverse?lon=${lon}&lat=${lat}&lang=en`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Photon API error: ${response.status}`);
        }

        const data = await response.json();
        let display_name = "Unknown Location";
        if (data.features && data.features.length > 0) {
            const props = data.features[0].properties || {};
            const addressParts = [props.name, props.street, props.city, props.state, props.country].filter(Boolean);
            display_name = addressParts.join(', ');
        }
        res.status(200).json({ display_name });
    } catch (err) {
        console.error("Reverse geocoding proxy error:", err);
        res.status(500).json({ message: "Reverse geocoding failed" });
    }
};

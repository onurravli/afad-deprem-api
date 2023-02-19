const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

axios
    .get("https://deprem.afad.gov.tr/last-earthquakes.html")
    .then((response) => {
        const html_content = response.data;
        const $ = cheerio.load(html_content);
        const table = $("table").eq(0);
        const table_rows = table.find("tr");

        class Earthquake {
            constructor(tarih, enlem, boylam, derinlik, tip, buyukluk, yer, id) {
                this.tarih = tarih;
                this.enlem = enlem;
                this.boylam = boylam;
                this.derinlik = derinlik;
                this.tip = tip;
                this.buyukluk = buyukluk;
                this.yer = yer;
                this.id = id;
            }
        }

        const earthquakes = [];

        table_rows.each((index, row) => {
            const td = $(row).find("td");
            const row_data = td.map((i, el) => $(el).text()).get();
            if (row_data.length) {
                const earthquake = new Earthquake(...row_data);
                earthquakes.push(earthquake);
            }
        });

        app.get("/son-deprem", (req, res) => {
            res.json(earthquakes[0]);
        });

        app.get("/", (req, res) => {
            res.json(earthquakes);
        });

        app.get("/yer/:yer", (req, res) => {
            const yer = req.params.yer.toLowerCase();
            const trueEarthquakes = earthquakes.filter((earthquake) =>
                earthquake.yer.toLowerCase().includes(yer)
            );
            if (trueEarthquakes.length > 0) {
                res.json(trueEarthquakes);
            } else {
                res.status(404).json({ error: "Deprem bulunamadı." });
            }
        });

        //Deprem büyüklüğü
        app.get("/buyukluk/:buyukluk", (req, res) => {
            const buyukluk = req.params.buyukluk
            if (buyukluk < 0) {
                res.status(404).json({ error: "Deprem değerleri 1 ve üzerinde gösterilmektedir." });
            } 
            const trueEarthquakes = earthquakes.filter((earthquake) =>
                earthquake.buyukluk > buyukluk
            );
            if (trueEarthquakes.length > 0) {
                res.json(trueEarthquakes);
            } else {
                res.status(404).json({ error: "Deprem bulunamadı." });
            }
        });

        app.get('/uzaklik/:lat/:lng', (req, res) => {
            const { lat, lng } = req.params;
          const sonuc=  _getCoordsDistance(lat,lng)
            res.json(sonuc);
        });

        //Son Depreme Uzaklık Hesaplama
        function _getCoordsDistance(lat, lng)
	    {
		// earth
		var R = 6371, // km
			lat1 = parseFloat(lat),
			lat2 = parseFloat(earthquakes[0].enlem),
			lon1 = parseFloat(lng),
			lon2 = parseFloat(earthquakes[0].boylam);
		
		// deg2rad
		lat1 = (lat1 / 180) * Math.PI;
		lat2 = (lat2 / 180) * Math.PI;
		lon1 = (lon1 / 180) * Math.PI;
		lon2 = (lon2 / 180) * Math.PI;
			
	    // Equirectangular approximation
	    // lower accuracy, higher performance
	    var x = (lon2-lon1) * Math.cos((lat1+lat2)/2);
		var y = (lat2-lat1);
		var d = Math.sqrt(x*x + y*y) * R;
		return Math.round(d );
	}

        app.use((req, res, next) => {
            res.status(404).json({ error: "Sayfa bulunamadı." });
        });
    })
    .catch((error) => {
        console.error(error);
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

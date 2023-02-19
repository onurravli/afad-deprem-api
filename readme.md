# AFAD Deprem API Hizmeti

T.C. İçişleri Bakanlığı Afet ve Acil Durum Yönetimi Başkanlığı web sitesinden çekilen, son deprem verileriyle sunulan **gayrıresmi** bir API servisidir.

## Açık Endpointler

Herhangi bir kimlik doğrulama gerektirmeyen endpointler.

-   [Depremler](https://afad-deprem-api.vercel.app/) : `GET /`
-   [Son Deprem](https://afad-deprem-api.vercel.app/son-deprem/) : `GET /son-deprem/`
-   [Yer](https://afad-deprem-api.vercel.app/yer/hatay) : `GET /yer/<string:yer>/`

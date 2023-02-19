# AFAD Deprem API Hizmeti

T.C. İçişleri Bakanlığı Afet ve Acil Durum Yönetimi Başkanlığı web sitesinden çekilen, son deprem verileriyle sunulan **gayrıresmi** bir API servisidir.

## Açık Endpointler

Herhangi bir kimlik doğrulama gerektirmeyen endpointler.

-   [Depremler](#/) : `GET /`
-   [Son Deprem](#) : `GET /son-deprem/`
-   [Büyüklük](#) : `GET /buyukluk/<number:buyukluk>/`
-   [Uzaklık](#) : `GET /uzaklik/:lat/:lng`
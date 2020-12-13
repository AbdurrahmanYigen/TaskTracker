# Time-Tracker
Diese Anwendung hilft dir, einen Überblick über deine Aufgaben zu haben und zu Managen

![Logo](../doku/logo.PNG "Logo")

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)



### Motivation
Keinen Überblick über deine letzten aktivitäten auf der Arbeit, in der Schule oder auch in der Freizeit?
Mit diesem Projekt ist es leicht gemacht deine Tasks aufzulisten, die Zeit zu Tracken wie lange du an einer Task arbeitest und was du in den Trackings geleistet hast.

Diese Projekt benutzt die mySQL Datenbank

### Installation
Um das Projekt aufzusetzen wird Docker verwendet. Verfolge die Folgenden Schritte:

1. Clone dir das Projekt in einen Ordner deiner Wahl
2. Navigiere in den Ordner `/fwe-ws20-21-756882-ha1/packages/backend`
3. Öffne ein Terminal in diesem Ordner und führe den Befehl `npm install` aus um dir die node_modules zu holen
4. Navigiere jetzt in den Ordner `/fwe-ws20-21-756882-ha1` in dem sich auch die `docker-compose.yml` befindet
5. Gib hier in die Konsole den Befehl `docker-compose up` oder `docker-compose up -d` ein, um die Datenbank und das Backend zu starten
6. Um das Backend nutzen zu können musst du vorerst die Tabellen der Datenbank erstellen.
Öffne dafür ein weiteres Terminal im Ordner `/fwe-ws20-21-756882-ha1` und führe den befehl `docker-compose exec backend npm run typeorm schema:sync` aus.

### Funktionalitäten
Das Backend läuft standart mäßig auf Port 4000. Also: `http://localhost:4000`
Es ist möglich:
- `POST /api/task` Tasks zu erstellen
- `GET /api/task/:taskId` Eine einzelne Task per Id aufzurufen
- `GET /api/task` Alle Existierenden Tasks aufzurufen
- `DELETE /api/task/:taskId` Eine Task per Id zu löschen
- `PATCH /api/task/:taskId` Eine Taks per Id zu bearbeiten

Es ist möglich: 
- `POST /api/label` Eine Label zu erstellen
- `GET /api/label/:labelId` Alle Labels einer Task aufzurufen
- `GET /api/label` Alle Existierenden Labels aufzurufen
- `PATCH /api/label/:labelId` Eine Label per Id zu überareiten
- `DELETE /api/label/:labelId` Eine Label per Id zu löschen

Es ist möglich:
- `POST api/tracking` Eine Tracking zu erstellen
- `GET api/tracking/:trackingId` Eine Tracking per Id abzurufen
- `PATCH api/tracking/:trackingId` Eine Tracking per Id zu bearbeiten
- `DELETE api/tracking/trackingId` Eine Tracking per Id zu löschen

#### Tests
Die Applikation kann mithilfe von Postman Collections getestet werden.
Diese befinden sich im Ordner `/fwe-ws20-21-756882-ha1`

##### Freestyle task
Außerdem ist es möglich aus einer Externen Api motivierende Zitate mit den dazugehörigen Autoren abzurufen `GET /api/motivation`

### Screenshots

##### Die Dashboard Page:
![Dashboard](../doku/Dashboard.PNG "DashboardPage")

##### Die Trackings Page einer Task:
![Trackings](../doku/Trackings.PNG "TrackingsPage")

##### Datenbank Aufbau
![Tabellen](../doku/relationenmodell.png "TabellenAufbau")


Lizenz
----

MIT

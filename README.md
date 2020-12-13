# Time-Tracker
Diese Anwendung hilft dir, einen Überblick über deine Aufgaben zu haben und zu Managen

![Logo](../doku/logo.PNG "Logo")

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)



### Motivation
Keinen Überblick über deine Aufgaben auf der Arbeit, in der Schule oder auch in der Freizeit?\
Mit diesem Projekt ist es leicht gemacht deine Tasks aufzulisten, die Zeit zu tracken wie lange du an einer Task arbeitest und was du in den Trackings geleistet hast.

Diese Projekt benutzt die mySQL Datenbank

### Installation
Um das Projekt aufzusetzen wird Docker verwendet. Verfolge die Folgenden Schritte:

1. Clone dir das Projekt in einen Ordner deiner Wahl
2. Navigiere in den Ordner `/fwe-ws20-21-756882-ha2/packages/backend`
3. Öffne ein Terminal in diesem Ordner und führe den Befehl `npm install` aus um dir die node_modules zu holen
4. Navigiere jetzt in den Ordner `/fwe-ws20-21-756882-ha2` in dem sich auch die `docker-compose.yml` befindet
5. Gib hier in die Konsole den Befehl `docker-compose up` oder `docker-compose up -d` ein, um die Datenbank, das Backend und das Frontend zu starten
6. Um das Backend nutzen zu können musst du vorerst die Tabellen der Datenbank erstellen.\
Öffne dafür ein weiteres Terminal im Ordner `/fwe-ws20-21-756882-ha2` und führe den befehl `docker-compose exec backend npm run typeorm schema:sync` aus.

Das Backend läuft standart mäßig auf Port 4000 und das Frontend auf Port 3000.\
Um auf die Dashboard Seite zu gelangen musst du auf `http://localhost:3000/dashboard`


### Funktionalitäten

Es ist möglich:
- Tasks zu erstellen
- Alle Existierenden Tasks aufzurufen
- Eine Task zu löschen
- Eine Taks zu bearbeiten

Es ist möglich: 
- Eine/mehrere Label/s zu einer Task zu erstellen (mit `,` bestätigen/trennen)
- Eine Label von einer Task durch das `x` an den Labels zu löschen

Es ist möglich:
- Eine Tracking zu starten
- Eine Tracking zu stoppen. Danach ist es erforderlich die Description für die Tracking zu beschreiben
- Durch das drücken auf das graue `i` unter der Total getrackten Zeit, öffnet sich die `Trackings-Seite`, in der alle Trackings aufgelistet werden, die zu der jeweiligen Task gehören
- Hier ist es möglich jede Tracking zu bearbeiten oder zu löschen.

In dem Eingabefeld oben kann nach Name, Description und Labels gleichzeitig gefiltert werden. Dabei spielt es keine Rolle, ob das Wort nachdem du suchst am Anfang, Mittendrin oder am Ende vorkommt.
Es werden also alle Tasks angezeigt, in dem das von dir gewünschte Wort in Name, Description oder in den Labels vorkommt.

Durch das Drücken auf HOME oben rechts oder auf das Logo oben links, wird man auf die dashboard Seite weiter geleitet

##### Freestyle task
Damit beim Abarbeiten der Tasks nicht die Motivation verloren geht, werden auf den Seiten unten immer extrem Motivierende und Inspirierende Zitate mit den zugehörigen Autoren eingeblendet, die auf Knopfdruck geändert werden können

### Screenshots

##### Die Dashboard Page:
![Dashboard](../doku/Dashboard.PNG "DashboardPage")

##### Die Trackings Page einer Task:
![Trackings](../doku/Trackings.PNG "TrackingsPage")

Lizenz
----

MIT

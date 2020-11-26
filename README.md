# Cadmas
Eine webbasierte Drohnen Management Suite zur autonomen Steuerung und Verwaltung von UAVs

Ein Projekt im Rahmen der Bachelorarbeit zur Erlangung des akademischen Grades Bachelor of Science, vorgelegt von Paul Stiegele.

## Kurzfassung
Aktuell sind Drohnen hauptsächlich durch umstrittene Einsätze des Militärs oder waghalsige
Manöver einiger Privatbesitzer in den Köpfen der Menschen präsent. Dass Drohnen für viele
Unternehmen und Organisationen allerdings auch hilfreiche Werkzeuge sein können, ist nicht
allzu bekannt. Oft ist ein Einsatz professioneller Drohnen sehr aufwendig und aufgrund der
Komplexität ist Expertenwissen gefragt oder ein Experte von Nöten.
In dieser Arbeit wird die Einstiegshürde zur Verwendung von unbemannten Luftfahrzeugen
(UAVs) mittels der Entwicklung eines Softwareportals zu deren zentraler Steuerung und
Verwaltung gesenkt. Die wegpunktgestützte Steuerung erfolgt bequem über eine Webapp
und dank reichweitenunabhängiger Übertragung über das Mobilfunknetz mit zuverlässiger
Telemetrie einschließlich eines Kamerabildes.

## Architekturkonzept

Die Softwaresuite wird unter dem Namen „CADMAS“ zusammengefasst, was für Cloudbased
Drone Management Suite steht. Der Softwarestack setzt sich aus drei wesentlichen Komponenten
zusammen:

**UAV-Connector** Der UAV-Connector ist das Bindeglied zwischen Autopilot und APIServer,
welches auf einem Kleinstcomputer verbaut innerhalb des UAVs läuft. Er empfängt
die Telemetrie des Autopiloten und sendet sie im passenden Format an den Server. Außerdem
empfängt er Telekommandos, wandelt diese in das passende Format des Autopiloten
um und gibt sie weiter.

**API-Server** Der API-Server ist das Herzstück des Projektes und sorgt für das Zusammenspiel
von UAV-Connector und Webapp. Er verwaltet die Verbindungen, empfängt Telemetrie
und Telekommandos, speichert diese in der Datenbank ab und sendet sie an die entsprechenden
Empfänger.

**Webapp** Die Webapp dient als Interface für den User, um das UAV zu verwalten und zu
steuern. Es stellt die vom API-Server empfangene Telemetrie in aufbereiteter Form dar und
überträgt vom User initiierte Operationen an den API-Server.

## Installationsanleitung
Neben der Installation eines Connectors auf dem UAV ist zum Betrieb von CADMAS das
Aufsetzen eines API-Servers und einer MySQL-Datenbank notwendig. Für das Ausliefern
der Webapp kann der API-Server verwendet werden.

### Installation von API-Server und Webanwendung
1. Zum klonen des CADMAS-Repositorys ist Git notwendig.
git-scm.com
2. Das CADMAS-Verzeichnis klonen
git clone https://github.com/pstiegele/cadmas/
3. Zum Ausführen ist die Installation von Node.js erforderlich
nodejs.org (LTS Version)
4. Anschließend alle Module im Hauptordner installieren
npm install
5. Auch für den Webclient müssen alle Module installiert werden.
cd cadmas-webclient && npm install
6. Zur Konfiguration des API-Servers werden die Parameter entweder beim Start mit
übergeben oder in einer .env-Datei gespeichert.
7. Um den Entwicklungsserver zu starten reicht der Befehl npm run-script run. Für die
Produktivumgebung sollte im Ordner cadmas-webclient zuerst npm run build-css
und npm run build ausgeführt werden. Anschließend kann der API-Server über einen
Aufruf von npm start im Hauptordner gestartet werden.

### Installation von Ardupilot-Connector
1. Zum klonen des Connector-Repositorys ist Git notwendig.
git-scm.com
2. Das Connector-Verzeichnis klonen
git clone https://github.com/pstiegele/cadmas/cadmas-connector
3. Zum Bauen wird „Apache Ant“ benötigt. Es kann über sudo apt-get install ant
installiert werden.
4. Anschließend in dem Connector-Verzeichnis ant ausführen
5. Zum Starten des Connectors java -jar "dist/ardupilot connector" ausführen.
Die Kommandozeilenparameter können angehangen werden. (siehe Kapitel A.1.3:
Connector Kommandozeilenparameter). Für den Autostart ist das run.sh-Skript sinnvoll:
Es aktualisiert das Repository, falls Änderungen vorliegen wird der Connector neu
gebaut und anschließend ausgeführt.

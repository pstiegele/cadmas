# Cadmas
Eine webbasierte Drohnen Management Suite zur autonomen Steuerung und Verwaltung von UAVs

Ein Projekt im Rahmen der Bachelorarbeit zur Erlangung des akademischen Grades Bachelor of Science, vorgelegt von Paul Stiegele.

# Kurzfassung
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
Zu Beginn wird eine kurze Übersicht bereits bestehender Services dargelegt. Im Anschluss
werden mögliche Architekturkonzepte evaluiert. Nach der Entscheidung für ein Konzept folgt
im Hauptteil der Arbeit die Implementierung der „CADMAS“ getauften Software für eine auf
Ardupilot basierende Drohne und eines auf AmazonWeb Services gehosteten Servers. Zuletzt
folgt eine Analyse der anfallenden Netzwerkauslastung des Systems im Flugtestbetrieb.
Da das Konzept insbesondere auf eine hohe Erweiterbarkeit ausgelegt ist, bietet sich die
Möglichkeit weitere, an das System anknüpfende Software zu entwickeln, wie bspw. einer
eigenständigen Bodenkontrollstation oder die Unterstützung anderer Autopilot-Systeme.

# Architekturkonzept

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

# easyClub - Installation

## Default Setup
Beim Start der Anwendung wird die Datenbank neu aufgesetzt und die import.sql importiert.

  <table>
    <thead>
      <tr>
        <th>User</th>
        <th>Password</th>
        <th>Role</th>
      </tr>
    </thead>
    <tbody>
        <tr>
            <td>admin</td>
            <td>adminadmin</td>
            <td><code>admin</code></td>
        </tr>
        <tr>
            <td>christian</td>
            <td>useruser</td>
            <td><code>executive</code></td>
        </tr>
        <tr>
            <td>lekeit00</td>
            <td>useruser</td>
            <td><code>user</code></td>
        </tr>
        <tr>
            <td>leukos00</td>
            <td>useruser</td>
            <td><code>user</code></td>
        </tr>
        <tr>
            <td>pascal</td>
            <td>useruser</td>
            <td><code>user</code></td>
        </tr>
    </tbody>
  </table>


## MailDev
Der Docker-Container mit dem Mail Server kann wie folgt gestartet werden:

`docker run -p 1080:1080 -p 1025:1025 maildev/maildev`

## MySQL
Auf dem MySQL Server muss eine Datenbank mit dem Namen `easyclubdb` vorhanden sein. Diese kann mit folgendem SQL-Statement erstellt werden:

`CREATE DATABASE easyclubdb;`


## Spring
Die Spring-Anwendung kann mit folgendem Befehl gestartet werden:

`mvn spring-boot:run`

Danach ist die Anwendung unter folgender URL erreichbar: http://localhost:8080/api/v1/

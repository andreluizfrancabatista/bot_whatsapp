// import express from "express";
const express = require('express')
// import * as venom from "venom-bot";
const venom = require('venom-bot')
// import dotenv from "dotenv";
require('dotenv').config()
// import fs from "fs";
const fs = require('fs')
// import path from "path";
const path = require('path')

const { fileURLToPath } = require('url')

const app = express();
const port = 3000;

app.use(express.json());

let client;
let isWhatsAppConnected = false;

// // Obter o caminho do diretório atual

app.get("/qrcode", (req, res) => {
  // Caminho para a pasta "tokens"
  const tokensPath = path.join(__dirname, "tokens");

  // Verifique se a pasta existe
  if (fs.existsSync(tokensPath)) {
    // Se existir, apague a pasta
    fs.rmdirSync(tokensPath, { recursive: true });
  }

  venom
    .create(
      { session: "session" },
      (base64Qrimg, asciiQR, attempts, urlCode) => {
        res.send(base64Qrimg);
      },
      (statusSession, session) => {
        console.log("Status Session: ", statusSession);
        console.log("Session name: ", session);
      },
      {
        browserPathExecutable: "",
        folderNameToken: "tokens",
        mkdirFolderToken: false,
        headless: "new",
        devtools: false,
        debug: false,
        logQR: true,
        browserWS: "",
        browserArgs: [""],
        addBrowserArgs: ["--user-agent"],
        puppeteerOptions: {},
        disableSpins: true,
        disableWelcome: true,
        updatesLog: true,
        autoClose: 60000,
        createPathFileToken: false,
        addProxy: [""],
        userProxy: "",
        userPass: "",
      },
      (browser, waPage) => {
        console.log("Browser PID:", browser.process().pid);
        waPage.screenshot({ path: "screenshot.png" });
      }
    )
    .then((venomClient) => {
      client = venomClient;
      isWhatsAppConnected = true;
      client.onMessage((message) => {
        if (message.body.toLowerCase() === 'ola') {
          client.sendText(message.from, 'Hello! Bem-vindo ao bot automatizado');
        } else {
            client.sendText(message.from, `Voce digitou: ${message.body}`);
        }
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Erro ao estabelecer conexão");
    });
});

app.get("/disconnect", (req, res) => {
  console.log("first");
  if (client) {
    client
      .close()
      .then(() => {
        isWhatsAppConnected = false;
        res.send(true);
      })
      .catch((error) => {
        console.error("Erro ao desconectar WhatsApp:", error);
        res.status(500).send(false);
      });
  } else {
    res.status(404).send("WhatsApp não estava conectado.");
  }
});

app.get("/status", (req, res) => {
  res.json(isWhatsAppConnected);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
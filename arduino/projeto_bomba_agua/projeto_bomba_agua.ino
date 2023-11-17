#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebSrv.h>
#include <ESP32Servo.h>

// Replace with your network credentials
const char* ssid     = "ESP32-Access-Point";
const char* password = "123456789";

const char* PARAM_INPUT_1 = "ssid";
const char* PARAM_INPUT_2 = "senha";
const char* PARAM_INPUT_3 = "input3";

// Set web server port number to 80
AsyncWebServer server(80);

// Variable to store the HTTP request
String header;

String index_html = "";
int isActive = 0;

// Set your Static IP address
IPAddress local_IP(192,168,100,117);
// Set your Gateway IP address
IPAddress gateway(192,168,100,1);

IPAddress subnet(255,255,255,0);
IPAddress primaryDNS(8, 8, 8, 8);   //optional
IPAddress secondaryDNS(8, 8, 4, 4); //optional

void createHtmlConfigurePage(){
  index_html = index_html + "<!DOCTYPE html>";
  index_html = index_html + "<html lang='pt-BR'>";
  index_html = index_html + "<head>";
  index_html = index_html + "<meta charset='UTF-8'>";
  index_html = index_html + "<meta name='viewport' content='width=device-width, initial-scale=1.0'>";
  index_html = index_html + "<title>Peixonauta2000</title>";
  index_html = index_html + "<style>";
  index_html = index_html + "*{/";
  index_html = index_html + "padding: 0;";
  index_html = index_html + "box-sizing: border-box;";
  index_html = index_html + "margin: 0;";
  index_html = index_html + "}";
  index_html = index_html + "main{";
  index_html = index_html + "display: flex;";
  index_html = index_html + "background-color: #222324;";
  index_html = index_html + "height: 100vh;";
  index_html = index_html + "justify-content: center;";
  index_html = index_html + "align-items: center;";
  index_html = index_html + "}";
  index_html = index_html + "#form{";
  index_html = index_html + "background-color: #fff;";
  index_html = index_html + "padding: 3em 2em;";
  index_html = index_html + "border-radius: 20px;";
  index_html = index_html + "}";
  index_html = index_html + "#form h1{";
  index_html = index_html + "font-family: Arial, Helvetica, sans-serif;";
  index_html = index_html + "font-size: 22pt;";
  index_html = index_html + "margin-bottom: 20px;";
  index_html = index_html + "}";
  index_html = index_html + "form{";
  index_html = index_html + "display: flex;";
  index_html = index_html + "flex-direction: column;";
  index_html = index_html + "gap: 20px;";
  index_html = index_html + "}";
  index_html = index_html + "form .input{";
  index_html = index_html + "display: flex;";
  index_html = index_html + "flex-direction: column;";
  index_html = index_html + "gap: 5px;";
  index_html = index_html + "}";
  index_html = index_html + "form .input label{";
  index_html = index_html + "font-family: Arial, Helvetica, sans-serif;";
  index_html = index_html + "font-weight: 500;";
  index_html = index_html + "}";
  index_html = index_html + "form .input input{";
  index_html = index_html + "background-color: #848483;";
  index_html = index_html + "border: none;";
  index_html = index_html + "padding: 5px 10px;";
  index_html = index_html + "border-radius: 5px;";
  index_html = index_html + "}";
  index_html = index_html + "form .input select{";
  index_html = index_html + "background-color: #848483;";
  index_html = index_html + "border: none;";
  index_html = index_html + "padding: 5px 10px;";
  index_html = index_html + "border-radius: 5px;";
  index_html = index_html + "color: #000;";
  index_html = index_html + "font-weight: 600;";
  index_html = index_html + "}";
  index_html = index_html + "form .input input[type='submit']{";
  index_html = index_html + "background-color: #848483;";
  index_html = index_html + "border: none;";
  index_html = index_html + "padding: 10px 10px;";
  index_html = index_html + "border-radius: 5px;";
  index_html = index_html + "font-weight: 600;";
  index_html = index_html + "font-size: 13pt;";
  index_html = index_html + "}";
  index_html = index_html + "</style>";
  index_html = index_html + "</head>";
  index_html = index_html + "<body>";
  index_html = index_html + "<main>";
  index_html = index_html + "<div id='form'>";
  index_html = index_html + "<h1>Faça Login na sua Rede</h1>";
  index_html = index_html + "<form action='/get'>";
  index_html = index_html + "<div class='input'>";
  index_html = index_html + "<label for=''>SSID:</label>";
  index_html = index_html + "<select name='ssid' id=''>";
  index_html = index_html + "<option value='-'>Selecione sua rede</option>";
  int n = WiFi.scanNetworks();
  Serial.println("scan done");
  if (n == 0) {
      Serial.println("no networks found");
  } else {
    Serial.print(n);
    Serial.println(" networks found");
    for (int i = 0; i < n; ++i) {
      index_html = index_html + "<option value='"+WiFi.SSID(i)+"'>"+WiFi.SSID(i)+"</option>";
      // Print SSID and RSSI for each network found
      //Serial.print(i + 1);
      //Serial.print(": ");
      // Serial.print(WiFi.SSID(i));
      //Serial.print(" (");
      //Serial.print(WiFi.RSSI(i));
      //Serial.print(")");
      //Serial.println((WiFi.encryptionType(i) == WIFI_AUTH_OPEN)?" ":"*");
      //delay(10);
    }
  }
  index_html = index_html + "</select>";
  index_html = index_html + "</div>";
  index_html = index_html + "<div class='input'>";
  index_html = index_html + "<label for=''>Senha:</label>";
  index_html = index_html + "<input type='password' name='senha' id=''>";
  index_html = index_html + "</div>";
  index_html = index_html + "<div class='input'>";
  index_html = index_html + "<input type='submit' name='' id=''>";
  index_html = index_html + "</div>";
  index_html = index_html + "</form>";
  index_html = index_html + "</div>";
  index_html = index_html + "</main>";
  index_html = index_html + "</body>";
  index_html = index_html + "</html>";
}

void setup() {
  Serial.begin(115200);
  
  pinMode(18, OUTPUT);
  digitalWrite(18, LOW);
  
  // Configures static IP address
  if (!WiFi.config(local_IP, gateway, subnet, primaryDNS, secondaryDNS)) {
    Serial.println("STA Failed to configure");
  }
  // Connect to Wi-Fi network with SSID and password
  Serial.print("Setting AP (Access Point)…");
  // Remove the password parameter, if you want the AP (Access Point) to be open
  
  WiFi.softAP(ssid, password);

  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(200, "text/html", index_html);
    index_html = "";
  });

  // Send a GET request to <ESP_IP>/get?input1=<inputMessage>
  server.on("/get", HTTP_GET, [] (AsyncWebServerRequest *request) {
    String inputMessage;
    String inputParam;

    String ssidLocal = "";
    String senha = "";
    // GET input1 value on <ESP_IP>/get?input1=<inputMessage>
    if (request->hasParam(PARAM_INPUT_1)) {
      ssidLocal = request->getParam(PARAM_INPUT_1)->value();
      inputParam = PARAM_INPUT_1;
    }
    // GET input2 value on <ESP_IP>/get?input2=<inputMessage>
    if (request->hasParam(PARAM_INPUT_2)) {
      senha = request->getParam(PARAM_INPUT_2)->value();
      inputParam = PARAM_INPUT_2;
    } else {
      inputMessage = "No message sent";
      inputParam = "none";
    }
    Serial.println(inputMessage);

    if(ssidLocal != "" && senha != ""){
      WiFi.disconnect();
      WiFi.begin(ssidLocal, senha);
      if (WiFi.waitForConnectResult() != WL_CONNECTED) {
        Serial.println("WiFi Failed!");
        request->send(200, "text/html", "Erro ao conectar na internet!");
        return;
      }

      request->send(200, "text/html", "Conectado com Sucesso!");
    }
   
  });

  server.on("/ligar", HTTP_GET, [](AsyncWebServerRequest *request){
    isActive = 1;
    request->send(200, "text/html", "ok");
  });

  server.on("/desligar", HTTP_GET, [](AsyncWebServerRequest *request){
    isActive = 0;
    request->send(200, "text/html", "ok");
  });
  
  server.begin();
}

void loop(){
  if(index_html == ""){
    createHtmlConfigurePage();
  }

  if(isActive == 1){
    digitalWrite(18, HIGH);
  } else if(isActive == 0){
    digitalWrite(18, LOW);
  }
}
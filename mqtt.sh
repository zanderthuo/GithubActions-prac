echo -e "\e[93m[*] \e[34mRunning Mqtt script from js file"
node mqtt.js
# Encrypting the Password file
echo -e "\e[93m[*] \e[34mEncrypting password file"
mosquitto_passwd -U pwd.txt
echo -e "\e[93m[*] \e[34mPassword file Encrypted"
echo -e "\e[93m[*] \e[34mRunning acl.js file"
node acl.js
# Move created file
echo -e "\e[93m[*] \e[34mMoving file password.txt"
mv pwd.txt ./mosquitto/config
mv acl.txt ./mosquitto/config
echo "\e[93m[*] \e[34mFile Moved successfully"
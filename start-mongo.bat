@echo off
echo =====================================
echo Starting MongoDB Replica Set (rs0)
echo =====================================

mongod --replSet rs0 --dbpath "C:\data\db"

pause

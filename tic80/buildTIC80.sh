# sudo apt-get install g++ git cmake libgtk-3-dev libglvnd-dev libglu1-mesa-dev freeglut3-dev -y
cd TIC-80/build
cmake -DBUILD_PRO=true ..
make -j4
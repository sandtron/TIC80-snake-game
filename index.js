////// SIDE-EFFECT FUNCTIONS

const context = {
    nTIC: 0,
    nSCN: 0,
    nOVR: 0
}
function SCN() {
    context.nSCN++;
}
function OVR() {
    context.nOVR++;
}
/**  
 * Main function called at 60 fps
 */
function TIC() {
    cls();
    print("hello world")


}


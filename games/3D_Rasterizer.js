/*
@title: 3d Renderer
@author: Ruadhan
@tags: [3d, render, demo]
@addedOn: 2024-00-00
*/

// Projection Matrix
function getProjMat(near, far, fov) {
  let s = 1/Math.tan(fov/2*(Math.PI/180));
  
  return [
    [s, 0, 0, 0],
    [0, s, 0, 0],
    [0, 0, -far/(far-near), -1],
    [0, 0, -far*near/(far-near), 0]
  ];
}

function V3Rotate(vec3, euler) {
  // Rotation about x axis
  let pre_rotate = [
    vec3[0],
    vec3[1]*Math.cos(euler[0]) - vec3[2]*Math.sin(euler[0]),
    vec3[1]*Math.sin(euler[0]) + vec3[2]*Math.cos(euler[0])
  ]

  // Rotation about y axis   
  pre_rotate = [
    pre_rotate[0]*Math.cos(euler[1]) + pre_rotate[2]*Math.sin(euler[1]),
    pre_rotate[1],
    -pre_rotate[0]*Math.sin(euler[1]) + pre_rotate[2]*Math.cos(euler[1])
  ]

  // Rotation about z axis
  return [
    pre_rotate[0]*Math.cos(euler[2]) - pre_rotate[1]*Math.sin(euler[2]),
    pre_rotate[0]*Math.sin(euler[2]) + pre_rotate[1]*Math.cos(euler[2]),
    pre_rotate[2]
  ]
}

function getCamToWorldMat() {
  return [
    [...V3Rotate([1, 0, 0], camRot), 0],
    [...V3Rotate([0, 1, 0], camRot), 0],
    [...V3Rotate([0, 0, 1], camRot), 0],
    [...camPos, 1],
  ]
}

// Matrix Multiplication
function matMul(v, m, affine) {
  let a = v[0] * m[0][0] + v[1] * m[1][0] + v[2] * m[2][0] + m[3][0];
  let b = v[0] * m[0][1] + v[1] * m[1][1] + v[2] * m[2][1] + m[3][1];
  let c = v[0] * m[0][2] + v[1] * m[1][2] + v[2] * m[2][2] + m[3][2];

  if (affine) return [a, b, c];
  
  let w = 1 / (v[0] * m[0][3] + v[1] * m[1][3] + v[2] * m[2][3] + m[3][3]);
  
  return [a * w, b * w, c * w];
}

// https://www.scratchapixel.com/lessons/mathematics-physics-for-computer-graphics/matrix-inverse/matrix-inverse.html
function Mat4x4Inv(t) {
  let s = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];

  // Forward elimination
  for (let i = 0; i < 3; i++) {
    // Step 1: Choose a pivot
    let pivot = i;
    let pivotSize = t[i][i];
    if (pivotSize < 0) pivotSize = -pivotSize;

    for (let j = i + 1; j < 4; j++) {
      let tmp = t[j][i];
      if (tmp < 0) tmp = -tmp;

      if (tmp > pivotSize) {
        pivot = j;
        pivotSize = tmp;
      }
    }

    if (pivotSize == 0) { return [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ]; }

    if (pivot != i) {
      for (let j = 0; j < 4; j++) {
        let tmp;
        tmp = t[i][j];
        t[i][j] = t[pivot][j];
        t[pivot][j] = tmp;
        tmp = s[i][j];
        s[i][j] = s[pivot][j];
        s[pivot][j] = tmp;
      }
    }

    // Step 2: Eliminate all the numbers below the diagonal
    for (let j = i + 1; j < 4; j++) {
      let f = t[j][i] / t[i][i];
      for (let k = 0; k < 4; k++) {
        t[j][k] -= f * t[i][k];
        s[j][k] -= f * s[i][k];
      }
      // Set the column value to exactly 0 in case
      // numeric round-off left it a very tiny number
      t[j][i] = 0;
    }
  }
  
  // Step 3: Set elements along the diagonal to 1.0
  for (let i = 0; i < 4; i++) {
      let divisor = t[i][i];
      for (let j = 0; j < 4; j++) {
        t[i][j] = t[i][j] / divisor;
        s[i][j] = s[i][j] / divisor;
      }
      // Set the diagonal to 1.0 exactly to avoid
      // possible round-off error
      t[i][i] = 1;
  }

  // Step 4: Eliminate all the numbers above the diagonal
  for (let i = 0; i < 3; i++) {
    for (let j = i + 1; j < 4; j++) {
      let constant = t[i][j];
      for (let k = 0; k < 4; k++) {
        t[i][k] -= t[j][k] * constant;
        s[i][k] -= s[j][k] * constant;
      }
      t[i][j] = 0; // In case of round-off error
    }
  }

  return s;
}

let camPos = [0, 0, -10];
let camRot = [0, 0, 0];

const world = [[[1.009051,1.586848,2.337462],[-0.565873,2.674802,0.594683],[-1.090323,2.552441,1.138527]],[[1.328537,1.803481,1.676565],[-0.135739,2.227091,0.147105],[-0.565873,2.674802,0.594683]],[[1.263843,1.583363,0.946395],[-0.051889,1.47157,0.057976],[-0.135739,2.227091,0.147105]],[[0.852866,1.055434,0.574675],[-0.363441,0.850814,0.379509],[-0.051889,1.47157,0.057976]],[[0.33635,0.528949,0.779154],[-0.887891,0.728452,0.923353],[-0.363441,0.850814,0.379509]],[[0.016864,0.312316,1.440051],[-1.318024,1.176163,1.370931],[-0.887891,0.728452,0.923353]],[[-1.318024,1.176163,1.370931],[0.492536,1.060363,2.541942],[-1.401874,1.931684,1.46006]],[[0.492536,1.060363,2.541942],[-1.090323,2.552441,1.138527],[-1.401874,1.931684,1.46006]],[[2.348588,-0.573673,1.776241],[1.328537,1.803481,1.676565],[1.009051,1.586848,2.337462]],[[2.537294,-0.146106,1.170136],[1.263843,1.583363,0.946395],[1.328537,1.803481,1.676565]],[[1.263843,1.583363,0.946395],[1.430159,0.124326,0.332808],[0.852866,1.055434,0.574675]],[[0.852866,1.055434,0.574675],[0.782863,-0.191224,0.59208],[0.33635,0.528949,0.779154]],[[0.782863,-0.191224,0.59208],[0.016864,0.312316,1.440051],[0.33635,0.528949,0.779154]],[[0.594157,-0.618792,1.198185],[0.081558,0.532434,2.170222],[0.016864,0.312316,1.440051]],[[0.974583,-0.907913,1.796074],[0.492536,1.060363,2.541942],[0.081558,0.532434,2.170222]],[[0.492536,1.060363,2.541942],[2.348588,-0.573673,1.776241],[1.009051,1.586848,2.337462]],[[1.919591,-2.302207,-0.122526],[2.537294,-0.146106,1.170136],[2.348588,-0.573673,1.776241]],[[2.15018,-1.705881,-0.543252],[2.156868,0.143015,0.572247],[2.537294,-0.146106,1.170136]],[[2.156868,0.143015,0.572247],[1.245276,-0.62061,-0.485493],[1.430159,0.124326,0.332808]],[[1.245276,-0.62061,-0.485493],[0.782863,-0.191224,0.59208],[1.430159,0.124326,0.332808]],[[0.782863,-0.191224,0.59208],[0.409275,-1.363728,0.379884],[0.594157,-0.618792,1.198185]],[[0.409275,-1.363728,0.379884],[0.974583,-0.907913,1.796074],[0.594157,-0.618792,1.198185]],[[0.688585,-2.060269,0.530229],[1.701293,-0.889224,2.035513],[0.974583,-0.907913,1.796074]],[[1.314179,-2.448999,0.322124],[2.348588,-0.573673,1.776241],[1.701293,-0.889224,2.035513]],[[0.045103,-2.297132,-1.929028],[2.15018,-1.705881,-0.543252],[1.919591,-2.302207,-0.122526]],[[0.458701,-1.701302,-2.173383],[1.87087,-1.00934,-0.693598],[2.15018,-1.705881,-0.543252]],[[0.621211,-1.005957,-1.897932],[1.245276,-0.62061,-0.485493],[1.87087,-1.00934,-0.693598]],[[0.437439,-0.618423,-1.26403],[0.639864,-0.767402,-0.040842],[1.245276,-0.62061,-0.485493]],[[0.015034,-0.765711,-0.643009],[0.409275,-1.363728,0.379884],[0.639864,-0.767402,-0.040842]],[[0.409275,-1.363728,0.379884],[-0.561073,-2.056886,-0.674105],[0.688585,-2.060269,0.530229]],[[-0.561073,-2.056886,-0.674105],[1.314179,-2.448999,0.322124],[0.688585,-2.060269,0.530229]],[[1.314179,-2.448999,0.322124],[0.045103,-2.297132,-1.929028],[1.919591,-2.302207,-0.122526]],[[-1.863349,-0.56227,-2.282933],[0.458701,-1.701302,-2.173383],[0.045103,-2.297132,-1.929028]],[[-1.263428,-0.135815,-2.492736],[0.621211,-1.005957,-1.897932],[0.458701,-1.701302,-2.173383]],[[-0.65109,0.150618,-2.133869],[0.437439,-0.618423,-1.26403],[0.621211,-1.005957,-1.897932]],[[-0.385036,0.129241,-1.416551],[0.015034,-0.765711,-0.643009],[0.437439,-0.618423,-1.26403]],[[-0.621116,-0.187423,-0.760978],[-0.398563,-1.361542,-0.398654],[0.015034,-0.765711,-0.643009]],[[-1.221038,-0.613877,-0.551175],[-0.561073,-2.056886,-0.674105],[-0.398563,-1.361542,-0.398654]],[[-1.833375,-0.900311,-0.910042],[-0.377301,-2.44442,-1.308007],[-0.561073,-2.056886,-0.674105]],[[-2.099429,-0.878934,-1.62736],[0.045103,-2.297132,-1.929028],[-0.377301,-2.44442,-1.308007]],[[-2.368661,1.595992,-0.917744],[-1.263428,-0.135815,-2.492736],[-1.863349,-0.56227,-2.282933]],[[-1.263428,-0.135815,-2.492736],[-0.987965,1.589459,-1.223742],[-0.65109,0.150618,-2.133869]],[[-0.987965,1.589459,-1.223742],[-0.385036,0.129241,-1.416551],[-0.65109,0.150618,-2.133869]],[[-0.602808,1.059375,-0.828203],[-0.621116,-0.187423,-0.760978],[-0.385036,0.129241,-1.416551]],[[-0.621116,-0.187423,-0.760978],[-1.43881,0.316256,0.037173],[-1.221038,-0.613877,-0.551175]],[[-1.43881,0.316256,0.037173],[-1.833375,-0.900311,-0.910042],[-1.221038,-0.613877,-0.551175]],[[-2.17025,0.53853,0.000084],[-2.099429,-0.878934,-1.62736],[-1.833375,-0.900311,-0.910042]],[[-2.555407,1.068614,-0.395455],[-1.863349,-0.56227,-2.282933],[-2.099429,-0.878934,-1.62736]],[[-2.368661,1.595992,-0.917744],[-0.565873,2.674802,0.594683],[-1.719406,1.811733,-1.260831]],[[-0.565873,2.674802,0.594683],[-0.987965,1.589459,-1.223742],[-1.719406,1.811733,-1.260831]],[[-0.135739,2.227091,0.147105],[-0.602808,1.059375,-0.828203],[-0.987965,1.589459,-1.223742]],[[-0.051889,1.47157,0.057976],[-0.789554,0.531997,-0.305915],[-0.602808,1.059375,-0.828203]],[[-0.789554,0.531997,-0.305915],[-0.887891,0.728452,0.923353],[-1.43881,0.316256,0.037173]],[[-0.887891,0.728452,0.923353],[-2.17025,0.53853,0.000084],[-1.43881,0.316256,0.037173]],[[-1.318024,1.176163,1.370931],[-2.555407,1.068614,-0.395455],[-2.17025,0.53853,0.000084]],[[-1.401874,1.931684,1.46006],[-2.368661,1.595992,-0.917744],[-2.555407,1.068614,-0.395455]],[[1.009051,1.586848,2.337462],[1.328537,1.803481,1.676565],[-0.565873,2.674802,0.594683]],[[1.328537,1.803481,1.676565],[1.263843,1.583363,0.946395],[-0.135739,2.227091,0.147105]],[[1.263843,1.583363,0.946395],[0.852866,1.055434,0.574675],[-0.051889,1.47157,0.057976]],[[0.852866,1.055434,0.574675],[0.33635,0.528949,0.779154],[-0.363441,0.850814,0.379509]],[[0.33635,0.528949,0.779154],[0.016864,0.312316,1.440051],[-0.887891,0.728452,0.923353]],[[0.016864,0.312316,1.440051],[0.081558,0.532434,2.170222],[-1.318024,1.176163,1.370931]],[[-1.318024,1.176163,1.370931],[0.081558,0.532434,2.170222],[0.492536,1.060363,2.541942]],[[0.492536,1.060363,2.541942],[1.009051,1.586848,2.337462],[-1.090323,2.552441,1.138527]],[[2.348588,-0.573673,1.776241],[2.537294,-0.146106,1.170136],[1.328537,1.803481,1.676565]],[[2.537294,-0.146106,1.170136],[2.156868,0.143015,0.572247],[1.263843,1.583363,0.946395]],[[1.263843,1.583363,0.946395],[2.156868,0.143015,0.572247],[1.430159,0.124326,0.332808]],[[0.852866,1.055434,0.574675],[1.430159,0.124326,0.332808],[0.782863,-0.191224,0.59208]],[[0.782863,-0.191224,0.59208],[0.594157,-0.618792,1.198185],[0.016864,0.312316,1.440051]],[[0.594157,-0.618792,1.198185],[0.974583,-0.907913,1.796074],[0.081558,0.532434,2.170222]],[[0.974583,-0.907913,1.796074],[1.701293,-0.889224,2.035513],[0.492536,1.060363,2.541942]],[[0.492536,1.060363,2.541942],[1.701293,-0.889224,2.035513],[2.348588,-0.573673,1.776241]],[[1.919591,-2.302207,-0.122526],[2.15018,-1.705881,-0.543252],[2.537294,-0.146106,1.170136]],[[2.15018,-1.705881,-0.543252],[1.87087,-1.00934,-0.693598],[2.156868,0.143015,0.572247]],[[2.156868,0.143015,0.572247],[1.87087,-1.00934,-0.693598],[1.245276,-0.62061,-0.485493]],[[1.245276,-0.62061,-0.485493],[0.639864,-0.767402,-0.040842],[0.782863,-0.191224,0.59208]],[[0.782863,-0.191224,0.59208],[0.639864,-0.767402,-0.040842],[0.409275,-1.363728,0.379884]],[[0.409275,-1.363728,0.379884],[0.688585,-2.060269,0.530229],[0.974583,-0.907913,1.796074]],[[0.688585,-2.060269,0.530229],[1.314179,-2.448999,0.322124],[1.701293,-0.889224,2.035513]],[[1.314179,-2.448999,0.322124],[1.919591,-2.302207,-0.122526],[2.348588,-0.573673,1.776241]],[[0.045103,-2.297132,-1.929028],[0.458701,-1.701302,-2.173383],[2.15018,-1.705881,-0.543252]],[[0.458701,-1.701302,-2.173383],[0.621211,-1.005957,-1.897932],[1.87087,-1.00934,-0.693598]],[[0.621211,-1.005957,-1.897932],[0.437439,-0.618423,-1.26403],[1.245276,-0.62061,-0.485493]],[[0.437439,-0.618423,-1.26403],[0.015034,-0.765711,-0.643009],[0.639864,-0.767402,-0.040842]],[[0.015034,-0.765711,-0.643009],[-0.398563,-1.361542,-0.398654],[0.409275,-1.363728,0.379884]],[[0.409275,-1.363728,0.379884],[-0.398563,-1.361542,-0.398654],[-0.561073,-2.056886,-0.674105]],[[-0.561073,-2.056886,-0.674105],[-0.377301,-2.44442,-1.308007],[1.314179,-2.448999,0.322124]],[[1.314179,-2.448999,0.322124],[-0.377301,-2.44442,-1.308007],[0.045103,-2.297132,-1.929028]],[[-1.863349,-0.56227,-2.282933],[-1.263428,-0.135815,-2.492736],[0.458701,-1.701302,-2.173383]],[[-1.263428,-0.135815,-2.492736],[-0.65109,0.150618,-2.133869],[0.621211,-1.005957,-1.897932]],[[-0.65109,0.150618,-2.133869],[-0.385036,0.129241,-1.416551],[0.437439,-0.618423,-1.26403]],[[-0.385036,0.129241,-1.416551],[-0.621116,-0.187423,-0.760978],[0.015034,-0.765711,-0.643009]],[[-0.621116,-0.187423,-0.760978],[-1.221038,-0.613877,-0.551175],[-0.398563,-1.361542,-0.398654]],[[-1.221038,-0.613877,-0.551175],[-1.833375,-0.900311,-0.910042],[-0.561073,-2.056886,-0.674105]],[[-1.833375,-0.900311,-0.910042],[-2.099429,-0.878934,-1.62736],[-0.377301,-2.44442,-1.308007]],[[-2.099429,-0.878934,-1.62736],[-1.863349,-0.56227,-2.282933],[0.045103,-2.297132,-1.929028]],[[-2.368661,1.595992,-0.917744],[-1.719406,1.811733,-1.260831],[-1.263428,-0.135815,-2.492736]],[[-1.263428,-0.135815,-2.492736],[-1.719406,1.811733,-1.260831],[-0.987965,1.589459,-1.223742]],[[-0.987965,1.589459,-1.223742],[-0.602808,1.059375,-0.828203],[-0.385036,0.129241,-1.416551]],[[-0.602808,1.059375,-0.828203],[-0.789554,0.531997,-0.305915],[-0.621116,-0.187423,-0.760978]],[[-0.621116,-0.187423,-0.760978],[-0.789554,0.531997,-0.305915],[-1.43881,0.316256,0.037173]],[[-1.43881,0.316256,0.037173],[-2.17025,0.53853,0.000084],[-1.833375,-0.900311,-0.910042]],[[-2.17025,0.53853,0.000084],[-2.555407,1.068614,-0.395455],[-2.099429,-0.878934,-1.62736]],[[-2.555407,1.068614,-0.395455],[-2.368661,1.595992,-0.917744],[-1.863349,-0.56227,-2.282933]],[[-2.368661,1.595992,-0.917744],[-1.090323,2.552441,1.138527],[-0.565873,2.674802,0.594683]],[[-0.565873,2.674802,0.594683],[-0.135739,2.227091,0.147105],[-0.987965,1.589459,-1.223742]],[[-0.135739,2.227091,0.147105],[-0.051889,1.47157,0.057976],[-0.602808,1.059375,-0.828203]],[[-0.051889,1.47157,0.057976],[-0.363441,0.850814,0.379509],[-0.789554,0.531997,-0.305915]],[[-0.789554,0.531997,-0.305915],[-0.363441,0.850814,0.379509],[-0.887891,0.728452,0.923353]],[[-0.887891,0.728452,0.923353],[-1.318024,1.176163,1.370931],[-2.17025,0.53853,0.000084]],[[-1.318024,1.176163,1.370931],[-1.401874,1.931684,1.46006],[-2.555407,1.068614,-0.395455]],[[-1.401874,1.931684,1.46006],[-1.090323,2.552441,1.138527],[-2.368661,1.595992,-0.917744]]]
const projMat = getProjMat(0.1, 100, 90);
let canvas = new Int8Array(160*128);
let depth = new Float32Array(160*128);

function V3Sub(a, b) {return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]}
function V3Mag(v) {return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2])}
function V3Dot(a, b) {return a[0]*b[0] + a[1]*b[1] + a[2]*b[2]}

function V3Cross(a, b) {
    return [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0]
    ]
}

function V3Norm(v) {
    let m = 1/V3Mag(v)
    return [v[0]*m, v[1]*m, v[2]*m]
}

function TriNormal(t) {
    return V3Norm(V3Cross(V3Sub(t[1], t[0]), V3Sub(t[2], t[0])))
}

function edgeFunction(a, b, c) { 
    return (c[0] - a[0]) * (b[1] - a[1]) - (c[1] - a[1]) * (b[0] - a[0])
}

function renderWorld() {
  canvas = new Int8Array(160*128);
  depth = new Float32Array(160*128).fill(0).map(_ => Infinity);
  
  const worldToCamMat = Mat4x4Inv(getCamToWorldMat());
  
  for (const tri of world) {
    let newTri = [];
    let newBounds = [Infinity, Infinity, -Infinity, -Infinity];
    let renderTri = true;
    
    for (const vec of tri) {
      let camVec = matMul(vec, worldToCamMat, true);
      let newVec = matMul(camVec, projMat);

      if (
        newVec[0] > 1 || newVec[0] < -1 ||
        newVec[1] > 1 || newVec[1] < -1 ||
        newVec[2] > 2 || newVec[2] < 1
      ) {
        renderTri = false;
        break;
      }

      let screenVec = [(newVec[0]+1)*80, (newVec[1]+1)*64, 1/camVec[2]];

      if (screenVec[0] < newBounds[0]) newBounds[0] = screenVec[0];
      if (screenVec[0] > newBounds[2]) newBounds[2] = screenVec[0];
      if (screenVec[1] < newBounds[1]) newBounds[1] = screenVec[1];
      if (screenVec[1] > newBounds[3]) newBounds[3] = screenVec[1];

      newTri.push(screenVec);
    }
    
    if (!renderTri) continue;

    let area = 1/edgeFunction(newTri[0], newTri[1], newTri[2]);

    for (let y=Math.round(newBounds[1]); y<Math.round(newBounds[3]); y++) {
      for (let x=Math.round(newBounds[0]); x<Math.round(newBounds[2]); x++) {
        let pixel = [x+0.5, y+0.5, 0]

        let w0 = edgeFunction(newTri[1], newTri[2], pixel);
        let w1 = edgeFunction(newTri[2], newTri[0], pixel);
        let w2 = edgeFunction(newTri[0], newTri[1], pixel);
        if (!(w0 >= 0 && w1 >= 0 && w2 >= 0)) continue;
        w0 *= area;
        w1 *= area;
        w2 *= area;

        let z = 1/(newTri[0][2] * w0 + newTri[1][2] * w1 + newTri[2][2] * w2);

        if (z > depth[y*160+x]) continue;
        
        let light = V3Dot(TriNormal(tri), [0, 1, 0]);
        canvas[y*160+x] = Math.floor((light+1)*1.5);
        depth[y*160+x] = z;
      }
    }
  }

  renderScreen();
}

function getPixel(x, y) {
  return canvas[y*160+x];
}

function renderScreen() {
  let finMap = '';
  let finLegend = [];
  for (let mapY = 0; mapY < 8; mapY++) {
    for (let mapX = 0; mapX < 10; mapX++) {
      let char = String.fromCharCode(mapX+mapY*10+47);

      let finBitmap = '';
      for (let legY=0; legY<16; legY++) {
        for (let legX=0; legX<16; legX++) {
          finBitmap += getPixel(mapX*16+legX, mapY*16+legY);
        }
        finBitmap += '\n';
      }
      
      finLegend.push([ char, bitmap`${finBitmap}` ]);
      finMap += char;
    }
    finMap += '\n';
  }

  setLegend(...finLegend)
  setMap(map`${finMap}`);
}

onInput("w", () => {
  let newAdd = V3Rotate([0, 0, 2], camRot);
  
  camPos[0] += newAdd[0];
  camPos[1] += newAdd[1];
  camPos[2] += newAdd[2];
});

onInput("a", () => {
  let newAdd = V3Rotate([2, 0, 0], camRot);
  
  camPos[0] += newAdd[0];
  camPos[1] += newAdd[1];
  camPos[2] += newAdd[2];
});

onInput("s", () => {
  let newAdd = V3Rotate([0, 0, -2], camRot);
  
  camPos[0] += newAdd[0];
  camPos[1] += newAdd[1];
  camPos[2] += newAdd[2];
});

onInput("d", () => {
  let newAdd = V3Rotate([-2, 0, 0], camRot);
  
  camPos[0] += newAdd[0];
  camPos[1] += newAdd[1];
  camPos[2] += newAdd[2];
});

onInput("j", () => {
  camRot[1] += 10*(Math.PI/180);
});

onInput("k", () => {
  camRot[0] += 10*(Math.PI/180);
});

onInput("i", () => {
  camRot[0] -= 10*(Math.PI/180);
});

onInput("l", () => {
  camRot[1] -= 10*(Math.PI/180);
});

afterInput(renderWorld);
renderWorld();
function translate(x, y, z) {
    var transMat4 = mat4.create();
    mat4.identity(transMat4);
    transMat4[12] = x;
    transMat4[13] = y;
    transMat4[14] = z;
    return transMat4;
}

function rotateX(theta) {
    var rotMat4 = mat4.create();
    var sinTheta = Math.sin(theta), cosThata = Math.cos(theta);
    mat4.identity(rotMat4);
    rotMat4[5] = cosThata;
    rotMat4[6] = sinTheta;
    rotMat4[9] = -sinTheta;
    rotMat4[10] = cosThata;
    return rotMat4;
}

function rotateY(theta) {
    var rotMat4 = mat4.create();
    var sinTheta = Math.sin(theta), cosThata = Math.cos(theta);
    mat4.identity(rotMat4);
    rotMat4[0] = cosThata;
    rotMat4[2] = -sinTheta;
    rotMat4[8] = sinTheta;
    rotMat4[10] = cosThata;
    return rotMat4;
}

function rotateZ(theta) {
    var rotMat4 = mat4.create();
    var sinTheta = Math.sin(theta), cosThata = Math.cos(theta);
    mat4.identity(rotMat4);
    rotMat4[0] = cosThata;
    rotMat4[1] = sinTheta;
    rotMat4[4] = -sinTheta;
    rotMat4[5] = cosThata;
    return rotMat4;
}

function rotate3D(point1, point2, theta) {
    var p1x = point1[0], p1y = point1[1], p1z = point1[2],
        p2x = point2[0], p2y = point2[1], p2z = point2[2],
        axisVectLength = Math.sqrt((p2x - p1x) * (p2x - p1x) + (p2y - p1y) * (p2y - p1y) + (p2z - p1z) * (p2z - p1z)),
        cosA = Math.cos(theta),
        oneC = 1 - cosA,
        sinA = Math.sin(theta),
        ux = (p2x - p1x) / axisVectLength,
        uy = (p2y - p1y) / axisVectLength,
        uz = (p2z - p1z) / axisVectLength;

    var transToOrigin = translate(-p1x, -p1y, -p1z);

    var rotMat4 = mat4.create();
    mat4.identity(rotMat4);

    rotMat4[0] = ux * ux * oneC + cosA;
    rotMat4[1] = uy * ux * oneC + uz * sinA;
    rotMat4[2] = uz * ux * oneC - uy * sinA;
    rotMat4[4] = ux * uy * oneC - uz * sinA;
    rotMat4[5] = uy * uy * oneC + cosA;
    rotMat4[6] = uz * uy * oneC + ux * sinA;
    rotMat4[8] = ux * uz * oneC + uy * sinA;
    rotMat4[9] = uy * uz * oneC - ux * sinA;
    rotMat4[10] = uz * uz * oneC + cosA;

    mat4.MULMat4(rotMat4,transToOrigin,rotMat4);
    var transBack = translate(p1x,p1y,p1z);
    mat4.MULMat4(transBack,rotMat4);
    return rotMat4;
}

function scale(sx,sy,sz,point) {
    if(!point) {
        var x=y=z=0;
    } else {
        var x=point[0],y=point[1],z=point[2];
    }
    var scaleMat4 = mat4.create();
    mat4.identity(scaleMat4);
    scaleMat4[0] = sx;
    scaleMat4[12] = (1-sx)*x;
    scaleMat4[5] = sy;
    scaleMat4[13] = (1-sy)*y;
    scaleMat4[10] = sz;
    scaleMat4[14] = (1-sz)*z;
    return scaleMat4;
}

function unvViewingCoordinate (viewPoint,refPoint,up) {
    var vPx = viewPoint[0],vPy= viewPoint[1],vPz = viewPoint[2],
        refPx = refPoint[0],refPy = refPoint[1],refPz = refPoint[2],
        uPx = up[0],uPy = up[1],uPz= up[2];
    var N = vec3.create(vPx-refPx,vPy-refPy,vPz-refPz),
        V = vec3.create(uPx,uPy,uPz);
    if(vec3.isEqual(N,V)) {
        throw new Error("View-Panel-Normal-Vector is parallel with View-UP-Vector");
    }
    var NLength = Math.sqrt(N[0]*N[0]+N[1]*N[1]+N[2]*N[2]);
    var VLength = Math.sqrt(V[0]*V[0]+V[1]*V[1]+V[2]*V[2]);
    var n = vec3.create(N[0]/NLength,N[1]/NLength,N[2]/NLength);
    var u = vec3.create((V[1]*n[2]-V[2]*n[1])/VLength,(V[2]*n[0]-V[0]*n[2])/VLength,(V[0]*n[1]-V[1]*n[0])/VLength);
    var v = vec3.create(n[1]*u[2]-n[2]*u[1],n[2]*u[0]-n[0]*u[2],n[0]*u[1]-n[1]*u[0]);
    var up = vPx*u[0]+vPy*u[1]+vPz*u[2],
        vp = vPx*v[0]+vPy*v[1]+vPz*v[2],
        np = vPx*n[0]+vPy*n[1]+vPz*n[2];
    var viewMat4 = mat4.create();
    mat4.identity(viewMat4);
    viewMat4[0] = u[0];
    viewMat4[1] = v[0];
    viewMat4[2] = n[0];
    viewMat4[4] = u[1];
    viewMat4[5] = v[1];
    viewMat4[6] = n[1];
    viewMat4[8] = u[2];
    viewMat4[9] = v[2];
    viewMat4[10] = n[2];
    viewMat4[12] = -up;
    viewMat4[13] = -vp;
    viewMat4[14] = -np;
    return viewMat4;
}

function normsymmpers (width,height,theta,near,far) {
    var cotTheta = 1.0/Math.tan(theta/2);
    var normsymmpers = mat4.create();
    mat4.identity(normsymmpers);
    normsymmpers[0] = cotTheta*width/height;
    normsymmpers[5] = cotTheta;
    normsymmpers[10] = (near+far)/(near -far);
    normsymmpers[11] = -1;
    normsymmpers[14] = -2*near*far/(near-far);
    normsymmpers[15] = 0;
    return normsymmpers;
}
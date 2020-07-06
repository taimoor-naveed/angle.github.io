function radians(angle) {
    return (angle * Math.PI) / 180;
}

function degrees(angle) {
    return (angle * 180) / Math.PI;
}

class PointP {
    constructor(r, theta, phi) {
        this.r = r;
        this.theta = theta;
        this.phi = phi;
    }

    toPointC() {
        const x =
            this.r *
            Math.sin(radians(this.theta)) *
            Math.cos(radians(this.phi));
        const y =
            this.r *
            Math.sin(radians(this.theta)) *
            Math.sin(radians(this.phi));
        const z = this.r * Math.cos(radians(this.theta));
        return new PointC(x, y, z);
    }

    static fromLookingAngles(r, azimuth, elevation) {
        return new PointP(r, 90 - elevation, 180 - azimuth);
    }
}

class PointC {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    toPointP() {
        const r = Math.sqrt(
            this.x * this.x + this.y * this.y + this.z * this.z
        );
        const phi = degrees(Math.atan2(this.y, this.x));
        const theta = degrees(Math.acos(this.z / r));
        return new PointP(r, theta, phi);
    }

    afterXRotation(angle) {
        const newY =
            this.y * Math.cos(radians(angle)) -
            this.z * Math.sin(radians(angle));
        const newZ =
            this.y * Math.sin(radians(angle)) +
            this.z * Math.cos(radians(angle));
        const newX = this.x;

        return new PointC(newX, newY, newZ);
    }

    afterYRotation(angle) {
        const newZ =
            this.z * Math.cos(radians(angle)) +
            this.x * Math.sin(radians(angle));
        const newX =
            this.x * Math.cos(radians(angle)) -
            this.z * Math.sin(radians(angle));
        const newY = this.y;

        return new PointC(newX, newY, newZ);
    }

    afterZRotation(angle) {
        const newX =
            this.x * Math.cos(radians(angle)) -
            this.y * Math.sin(radians(angle));
        const newY =
            this.x * Math.sin(radians(angle)) +
            this.y * Math.cos(radians(angle));
        const newZ = this.z;

        return new PointC(newX, newY, newZ);
    }
}

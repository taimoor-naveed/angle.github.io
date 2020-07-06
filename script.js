function onBodyLoad() {
    const app = document.getElementsByClassName('app')[0];
    app.style.height = `${window.innerHeight}px`;
}

function onSubmit(event) {
    event.preventDefault();

    const azimuthInput = document.getElementById('azimuth-input');
    const elevationInput = document.getElementById('elevation-input');
    const resultTheta = document.getElementById('theta-label');
    const resultPhi = document.getElementById('phi-label');
    console.log(resultPhi);
    if (
        isNaN(azimuthInput.value) ||
        isNaN(elevationInput.value) ||
        azimuthInput.value.length == 0 ||
        elevationInput.value.length == 0
    ) {
        resultTheta.innerHTML = 'Theta:';
        resultPhi.innerHTML = 'Phi:';
        console.log('Error');
        return;
    }

    console.log('success');

    let pPoint = new PointP(1, 0, 0);

    let cPoint = pPoint.toPointC();

    cPoint = cPoint.afterYRotation(azimuthInput.value);
    cPoint = cPoint.afterXRotation(elevationInput.value);

    const result = cPoint.toPointP();

    resultTheta.innerHTML = `Theta: ${result.theta}`;
    resultPhi.innerHTML = `Phi: ${result.phi}`;
}

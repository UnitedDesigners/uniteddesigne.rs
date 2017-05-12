function formToJSON(elements) {
  return [].reduce.call(elements, function (data, element) {
    if (element.name && element.value && (!['checkbox', 'radio'].includes(element.type) || element.checked)) {
      if (element.type === 'checkbox') {
        data[element.name] = (data[element.name] || []).concat(element.value);
      } else if (element.options && element.multiple) {
        data[element.name] = [].reduce.call(element, function (values, option) {
          return option.selected ? values.concat(option.value) : values;
        }, []);
      } else {
        data[element.name] = element.value;
      }
    }
    return data;
  }, {});
};

function handleFormSubmit(event) {
  event.preventDefault();
  var data = formToJSON(form.elements);
  btn.disabled = true;
  btn.className = '';
  btn.innerText = 'Sending...';
  form.classList.add('loading');
  if(!('portfolio' in data)) {
    data.portfolio = 'Not provided.';
  }
  var xhr = new XMLHttpRequest();
  xhr.open('PUT', 'https://kzl0zkdru3.execute-api.us-west-2.amazonaws.com/testing/applications', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(data));
  xhr.onloadend = function () {
    if(JSON.parse(xhr.response).message == 'Success') {
      btn.innerText = 'Thanks!';
      btn.className = 'success';
    } else {
      btn.innerText = 'Something borked, click to try again!';
      btn.className = 'error';
      btn.disabled = false;
    }
  };
};

var form = document.getElementById('apply-form'),
    btn = form.getElementsByTagName('button')[0],
    canvas = document.getElementById("stars"),
    ctx = canvas.getContext('2d'),
    stars = [];

function addStars() {
  stars = [];
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  for (var i = 0; i < canvas.width/10; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random(),
      vx: (Math.floor(Math.random() * 10) - 5) / 30,
      vy: (Math.floor(Math.random() * 10) - 5) / 30
    });
  }
}

function tick() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.globalCompositeOperation = "lighter";
  for (var i = 0, x = stars.length; i < x; i++) {
    var s = stars[i];
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
    ctx.fill();
    s.x += s.vx;
    s.y += s.vy;
    if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
    if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;
  }
  requestAnimationFrame(tick);
}

window.addEventListener("orientationchange", addStars);


form.addEventListener('submit', handleFormSubmit);

addStars();
tick();

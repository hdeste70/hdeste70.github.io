// Fondo dinámico con canvas
const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const particles = [];
const particleCount = 120;
const maxLineDistance = 150;

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.radius = 2;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.fill();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }
}

function createParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxLineDistance) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / maxLineDistance})`;
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let particle of particles) {
        particle.update();
        particle.draw();
    }

    connectParticles();
    requestAnimationFrame(animate);
}

createParticles();
animate();

window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

// Manejo de login
document.getElementById("loginBtn").addEventListener("click", () => {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === "admin" && pass === "1234") {
        document.getElementById("loadingScreen").style.display = "none";
        document.querySelector(".container").style.display = "block";
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
});

// Base de datos local con IndexedDB
const dbName = "clientesDB";
let db;
const username = "admin";
const password = "1234";

function initDB() {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (e) => {
        db = e.target.result;
        const store = db.createObjectStore("clientes", { keyPath: "id", autoIncrement: true });
        store.createIndex("nombre", "nombre", { unique: false });
    };

    request.onsuccess = (e) => {
        db = e.target.result;
        cargarClientes();
    };
}

function cargarClientes() {
    const transaction = db.transaction(["clientes"], "readonly");
    const store = transaction.objectStore("clientes");
    const request = store.getAll();

    request.onsuccess = (e) => {
        const clientes = e.target.result;
        const tbody = document.querySelector("#clientesTable tbody");
        tbody.innerHTML = clientes.map(cliente => `
            <tr>
                <td>${cliente.id}</td>
                <td>${cliente.nombre}</td>
                <td>${cliente.ip_address}</td>
                <td>${cliente.fecha_ingreso}</td>
                <td>${cliente.proxima_fecha_pago}</td>
                <td>${cliente.plan_contratado}</td>
                <td>$${cliente.efectivo_a_pagar.toFixed(2)}</td>
                <td><button onclick="eliminarCliente(${cliente.id})">Eliminar</button></td>
            </tr>
        `).join("");
    };
}

function eliminarCliente(id) {
    const transaction = db.transaction(["clientes"], "readwrite");
    const store = transaction.objectStore("clientes");
    store.delete(id);
    transaction.oncomplete = () => cargarClientes();
}

function agregarCliente(cliente) {
    const transaction = db.transaction(["clientes"], "readwrite");
    const store = transaction.objectStore("clientes");
    store.add(cliente);
    transaction.oncomplete = () => cargarClientes();
}

document.getElementById("clienteForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const cliente = {
        nombre: document.getElementById("nombre").value,
        ip_address: document.getElementById("ip_address").value,
        fecha_ingreso: document.getElementById("fecha_ingreso").value,
        proxima_fecha_pago: document.getElementById("proxima_fecha_pago").value,
        plan_contratado: document.getElementById("plan_contratado").value,
        efectivo_a_pagar: parseFloat(document.getElementById("efectivo_a_pagar").value)
    };
    agregarCliente(cliente);
    e.target.reset();
});

// Exportar clientes
function exportarClientes() {}

// Login básico
document.getElementById("loginBtn").addEventListener("click", () => {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === username && pass === password) {
        document.getElementById("loadingScreen").style.display = "none";
        document.querySelector(".container").style.display = "block";
        initDB();
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
});

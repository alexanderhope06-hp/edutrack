// ===== HERO CHART (Mini Preview) =====
const heroCtx = document.getElementById('heroChart');
if (heroCtx) {
    new Chart(heroCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Students',
                data: [950, 1020, 1080, 1150, 1200, 1220, 1250],
                borderColor: '#4f46e5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: { display: false },
                y: { display: false }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// ===== MAIN CHART (Students & Subjects) =====
const mainCtx = document.getElementById('mainChart');
if (mainCtx) {
    new Chart(mainCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [
                {
                    label: 'Students',
                    data: [950, 1020, 1080, 1150, 1200, 1220, 1250],
                    backgroundColor: '#4f46e5',
                    borderRadius: 4,
                    barPercentage: 0.6
                },
                {
                    label: 'Subjects',
                    data: [30, 34, 38, 40, 44, 46, 48],
                    backgroundColor: '#22c55e',
                    borderRadius: 4,
                    barPercentage: 0.6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { font: { size: 11 } }
                },
                y: {
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    ticks: { font: { size: 11 } }
                }
            }
        }
    });
}

// ===== PERFORMANCE CHART =====
const perfCtx = document.getElementById('performanceChart');
if (perfCtx) {
    new Chart(perfCtx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
            datasets: [
                {
                    label: 'Math',
                    data: [65, 70, 68, 75, 80, 78, 85, 90],
                    borderColor: '#4f46e5',
                    backgroundColor: 'rgba(79, 70, 229, 0.05)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 3,
                    borderWidth: 2.5
                },
                {
                    label: 'Science',
                    data: [55, 60, 62, 58, 70, 72, 68, 78],
                    borderColor: '#0ea5e9',
                    backgroundColor: 'rgba(14, 165, 233, 0.05)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 3,
                    borderWidth: 2.5
                },
                {
                    label: 'English',
                    data: [70, 72, 68, 75, 80, 82, 78, 85],
                    borderColor: '#22c55e',
                    backgroundColor: 'rgba(34, 197, 94, 0.05)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 3,
                    borderWidth: 2.5
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 16,
                        font: { size: 11 }
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { font: { size: 10 } }
                },
                y: {
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    ticks: { font: { size: 10 } },
                    min: 40,
                    max: 100
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

console.log('📊 Charts initialized successfully!');
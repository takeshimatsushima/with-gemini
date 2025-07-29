document.addEventListener('DOMContentLoaded', function() {
    const wrapLabel = (label) => {
        if (typeof label !== 'string') return label;
        const maxLength = 16;
        if (label.length <= maxLength) return label;
        const words = label.split(' ');
        let lines = [];
        let currentLine = '';
        for (const word of words) {
            if ((currentLine + ' ' + word).trim().length > maxLength) {
                if (currentLine) lines.push(currentLine.trim());
                currentLine = word;
            } else {
                currentLine = (currentLine + ' ' + word).trim();
            }
        }
        if (currentLine) lines.push(currentLine.trim());
        return lines.length > 0 ? lines : [label];
    };
    
    const tooltipTitleCallback = (tooltipItems) => {
        const item = tooltipItems[0];
        let label = item.chart.data.labels[item.dataIndex];
        if (Array.isArray(label)) {
          return label.join(' ');
        }
        return label;
    };

    const commonTooltipOptions = {
        plugins: {
            tooltip: {
                callbacks: {
                    title: tooltipTitleCallback
                }
            }
        }
    };
    
    const teacherTrainingCtx = document.getElementById('teacherTrainingChart').getContext('2d');
    new Chart(teacherTrainingCtx, {
        type: 'bar',
        data: {
            labels: ['都道府県', '政令指定都市', '中核市', 'その他'],
            datasets: [{
                label: '研修を実施済み/予定 (%)',
                data: [65.7, 38.5, 36.8, 8.2],
                backgroundColor: '#80B9F2',
                borderColor: '#006EE6',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: '実施率 (%)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: '自治体規模別の教員研修実施率（R6年度）',
                    font: { size: 16 }
                },
                tooltip: commonTooltipOptions.plugins.tooltip
            }
        }
    });

    const studentPerceptionCtx = document.getElementById('studentPerceptionChart').getContext('2d');
    new Chart(studentPerceptionCtx, {
        type: 'bar',
        data: {
            labels: [
                wrapLabel('なんでもできる'), 
                wrapLabel('調べ物が得意'), 
                wrapLabel('仕事をうばう'), 
                wrapLabel('勉強しなくてもよくなる'), 
                wrapLabel('間違ったことをいう'), 
                wrapLabel('その他')
            ],
            datasets: [
                {
                    label: '利用前',
                    data: [133, 105, 49, 26, 20, 37],
                    backgroundColor: '#80B9F2',
                },
                {
                    label: '利用後',
                    data: [63, 72, 30, 11, 54, 77],
                    backgroundColor: '#004AAD',
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: '回答数 (人)' }
                }
            },
            plugins: {
                legend: { position: 'top' },
                title: {
                    display: true,
                    text: '生成AI利用前後の生徒のイメージ変化',
                    font: { size: 16 }
                },
                tooltip: commonTooltipOptions.plugins.tooltip
            }
        }
    });

    const tabs = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            tabContents.forEach(content => {
                if (content.id === target) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });
});

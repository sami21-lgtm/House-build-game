const buildBtn = document.getElementById('buildBtn');
const resetBtn = document.getElementById('resetBtn');
const houseContainer = document.getElementById('houseContainer');
const reflectedHouse = document.getElementById('reflectedHouse');

let floorCount = 0;
const maxFloors = 5; // Maximum floor limit before adding roof

function createFloorDOM(isReflected = false) {
    const floor = document.createElement('div');
    
    // Manage styles based on height/layer index
    if (floorCount <= 2) {
        floor.className = 'floor base-layer';
    } else {
        floor.className = 'floor mid-layer';
    }

    // Dynamic inner windows generation
    for (let i = 0; i < 4; i++) {
        const windowDiv = document.createElement('div');
        windowDiv.className = 'window';
        
        // Randomly light up some windows like the original game image
        if (Math.random() > 0.4) {
            windowDiv.classList.add('lit');
        }
        
        // Give central windows a round variation for design aesthetics
        if (i === 1 || i === 2) {
            if (floorCount === 2 || floorCount === 3) {
                windowDiv.classList.add('round');
            }
        }
        
        floor.appendChild(windowDiv);
    }

    // Add a door on the very first ground floor
    if (floorCount === 1) {
        const door = document.createElement('div');
        door.className = 'door';
        // Position doors at left/right corners randomly
        door.style.left = Math.random() > 0.5 ? '20px' : '100px';
        floor.appendChild(door);
    }

    return floor;
}

function addFloor() {
    if (floorCount >= maxFloors) {
        // If max floors reached, build the top final roof
        if (!document.querySelector('.roof')) {
            const roof = document.createElement('div');
            roof.className = 'roof';
            
            const tree = document.createElement('div');
            tree.className = 'roof-tree';
            
            const cloud = document.createElement('div');
            cloud.className = 'roof-cloud';
            
            roof.appendChild(tree);
            roof.appendChild(cloud);

            // Clone for water reflection target
            const roofReflect = roof.cloneNode(true);

            houseContainer.appendChild(roof);
            reflectedHouse.appendChild(roofReflect);
            
            buildBtn.textContent = "🏡 House Completed!";
            buildBtn.style.backgroundColor = "#9b59b6";
            buildBtn.disabled = true;
        }
        return;
    }

    floorCount++;

    // Generate elements for both house and its water reflection
    const newFloor = createFloorDOM(false);
    const reflectedFloor = createFloorDOM(true);

    houseContainer.appendChild(newFloor);
    reflectedHouse.appendChild(reflectedFloor);
}

function resetGame() {
    floorCount = 0;
    // Clear everything except ground/grass setup
    houseContainer.innerHTML = '<div class="ground-grass"></div>';
    reflectedHouse.innerHTML = '';
    
    // Restore button conditions
    buildBtn.textContent = "🏗️ Add Next Floor";
    buildBtn.style.backgroundColor = "#2ecc71";
    buildBtn.disabled = false;
}

// Event Listeners for Mobile Actions
buildBtn.addEventListener('click', addFloor);
resetBtn.addEventListener('click', resetGame);

//Button & Event Listner

document
    .querySelector("#dress_type")
    .addEventListener("click", (e) => selectingDressType(e.target));

document
    .querySelector("#submittingBtn")
    .addEventListener("click", () => submittingInputs());

// Functions
function selectingDressType(clickedElement) {
    let dress_type = document.querySelector("#dress_type");
    let listOfOptions = Object.values(dress_type.children);

    // changing all selected value = false
    listOfOptions.forEach((element) => {
        let reseting = element.setAttribute("selected", "false");
    });

    if (clickedElement.tagName === "P") {
        clickedElement = clickedElement.parentElement;
    }

    //setting clicked Element attribute (selected="true")
    clickedElement.setAttribute("selected", "true");
}

function submittingInputs() {
    //clearing the Output field
    document.querySelector("#outPut").innerHTML = "";

    let dress_type = () => {
        let types = document.querySelector("#dress_type").children;
        types = Object.values(types);
        let selected;
        types.forEach((e) => {
            let check = e.getAttribute("selected");

            if (check === "true") {
                selected = e.getAttribute("value");
            } else {
            }
        });

        return selected;
    };

    dress_type = dress_type().toUpperCase();
    let weight = document.querySelector("#weight").value;
    let height = document.querySelector("#height").value;

    const orgnizedData = {
        dress_type: dress_type,
        height: Number(height),
        weight: Number(weight),
        height_to_weight: (height - weight - 100) * -1,
    };

    //+++++++++++ List for Functions to Run

    //checking if any height,weight inputed
    if (orgnizedData.height + orgnizedData.weight === 0) {
        console.log("Stopping the Process , cause: No Data Entered");
        printingResult([]);
        let outputed_comment = document.querySelector("#outPut");
        outputed_comment.firstChild.innerHTML =
            "<p style='width:100%; word-spacing:6px; color:white;'>کێش و باڵات داخڵ نەکردووە</p>";
        outputed_comment.firstChild.style.backgroundColor = "#DC3545";
        return 0;
    }

    // ========= printing (height,weight) && clearing input field
    printingResult([
        `کێش : ${orgnizedData.weight}`,
        `باڵا : ${orgnizedData.height}`,
    ]);

    Object.values(document.querySelector("#height_weight").children).map(
        (e) => (e.value = "")
    );

    // ===========  drezhy qol

    cpu(orgnizedData, "درێژی قۆڵ");

    //  drezhy tanwra
    var od = orgnizedData;
    od.dress_type = "DREZHY_TANWRA";
    cpu(od, "درێژی تەنورە");

    // ===========  DREZHY_LASTIK_TANWRA
    var od = orgnizedData;
    od.dress_type = "DREZHY_LASTIK_TANWRA";
    cpu(od, "درێژی لاستیکی تەنورە");

    // =========== ZNJIR
    if (dress_type == "SAR") {
        od.dress_type = "ZNJIR";
        cpu(od, "درێژی زنجیرەکەی");
    }
    
    // =========== Pzma
        var od = orgnizedData;
        od.dress_type = "QIAS-SHAN";
        cpu(od, "قیاسی شان");
    
    // ===========  jiwazy kesh bo bala
    jiawazy_kesh(orgnizedData.height_to_weight);
}

function printingResult([pro, res]) {
    //      creating and appending the element

    let DIV_print = document.createElement("div");
    DIV_print.classList.add("print");

    let P_res = document.createElement("p");
    P_res.classList.add("outPutValue");
    P_res.innerText = res;

    let P_pro = document.createElement("p");
    P_pro.classList.add("outPutProperty");
    P_pro.innerText = pro;

    DIV_print.appendChild(P_res);
    DIV_print.appendChild(P_pro);
    document.querySelector("#outPut").appendChild(DIV_print);
}

//+++++++++++++ Dresses Functions

// Database
let db = fetch("./db.json")
    .then((res) => res.json())
    .then((res) => {
        db = res;
    });

function cpu(od, title) {
    // specifiong height
    let dress_type = od.dress_type.toString();
    let dress_sizes = db[dress_type];

    for (let index = 0; index < dress_sizes.length; index++) {
        let i_dress_sizes = dress_sizes[index];
        let start = i_dress_sizes.limit[0];
        let end = i_dress_sizes.limit[1];
        let person_height = od.height;

        let result1 = start <= person_height;
        let result2 = end > person_height;
        let finalResult = result1 + result2;

        if (finalResult >= 2) {
            //checking Weight Difference for result
            for (let i = 0; i < i_dress_sizes.sizes.length; i++) {
                const sizes = i_dress_sizes.sizes[i];

                const height_to_weight = od.height_to_weight;
                let start = sizes[0];
                let end = sizes[1];

                let result1 = start <= height_to_weight;
                let result2 = end > height_to_weight;
                let finalResult = result1 + result2;

                if (finalResult >= 2) {
                    printingResult([title, sizes[2]]);

                    break;
                }
            }

            break;
        }
    }
}

function jiawazy_kesh(height_to_weight) {
    if (height_to_weight >= 0) {
        printingResult([
            "جیاوازی کێش و باڵا",
            height_to_weight + " : " + "کیلۆ زیاترە",
        ]);
    } else if (height_to_weight < 0) {
        printingResult([
            "جیاوازی کێش و باڵا",
            height_to_weight * -1 + " : " + "کیلۆ کەمترە",
        ]);
    }
}

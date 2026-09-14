const novelGrid =
    document.getElementById("novelGrid");

const search =
    document.getElementById("search");


async function loadNovels(){

    try{

        const response =
            await fetch("data/novels.xml");

        if(!response.ok){

            throw new Error(
                "Could not load novels.xml"
            );

        }

        const text =
            await response.text();

        const parser =
            new DOMParser();

        const xml =
            parser.parseFromString(
                text,
                "application/xml"
            );

        const novels =
            [...xml.querySelectorAll("novel")];

        displayNovels(novels);

        search.addEventListener(
            "input",
            () => {

                const value =
                    search.value
                    .toLowerCase()
                    .trim();

                const filtered =
                    novels.filter(novel => {

                        const title =
                            novel
                            .getAttribute("title")
                            .toLowerCase();

                        const genre =
                            novel
                            .getAttribute("genre")
                            .toLowerCase();

                        return(
                            title.includes(value) ||
                            genre.includes(value)
                        );

                    });

                displayNovels(filtered);

            }
        );

    }catch(error){

        console.error(error);

        novelGrid.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h2>Unable to load novels</h2>
                    <p class="description">
                    Please try again later.
                    </p>
                </div>
            </div>
        `;

    }

}


function displayNovels(novels){

    novelGrid.innerHTML = "";

    if(novels.length === 0){

        novelGrid.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h2>No novels found</h2>
                    <p class="description">
                    Try another search.
                    </p>
                </div>
            </div>
        `;

        return;
    }


    novels.forEach(novel => {

        const id =
            novel.getAttribute("id");

        const title =
            novel.getAttribute("title");

        const genre =
            novel.getAttribute("genre");

        const price =
            novel.getAttribute("price");

        const status =
            novel.getAttribute("status");

        const description =
            novel
            .querySelector("description")
            ?.textContent
            .trim()
            || "";


        const firstChapter =
            novel.querySelector("chapter");


        let button = "";

        if(status === "Coming Soon"){

            button = `
                <span class="btn">
                    🔒 Coming Soon
                </span>
            `;

        }else{

            const chapter =
                firstChapter
                ?.getAttribute("id")
                || "1";

            button = `
                <a
                class="btn"
                href="reader.html?type=novel&id=${id}&chapter=${chapter}">
                    📖 Read Now
                </a>
            `;

        }


        novelGrid.innerHTML += `

            <article class="card">

                <div class="cover">

                    <h2>
                        ${title}
                    </h2>

                </div>


                <div class="card-body">

                    <h2>
                        ${title}
                    </h2>

                    <div class="genre">
                        ${genre}
                    </div>

                    <p class="description">
                        ${description}
                    </p>

                    <p>
                        ${
                            price === "0"
                            ? "FREE"
                            : "From ₹" + price
                        }
                    </p>

                    <br>

                    ${button}

                </div>

            </article>

        `;

    });

}


loadNovels();

const docs = [

    {
        name: "Employee Handbook 2026",
        type: "pdf",
        dept: "Human Resources",
        size: "2.4 MB",
        date: "Today",
        fav: true
    },

    {
        name: "Remote Work Policy",
        type: "docx",
        dept: "Human Resources",
        size: "1.2 MB",
        date: "Yesterday",
        fav: true
    },

    {
        name: "Project Financial Report",
        type: "xlsx",
        dept: "Finance",
        size: "3.8 MB",
        date: "2 days ago",
        fav: false
    },

    {
        name: "Information Security Policy",
        type: "pdf",
        dept: "Information Technology",
        size: "1.8 MB",
        date: "3 days ago",
        fav: true
    },

    {
        name: "Annual Project Report",
        type: "pdf",
        dept: "Management",
        size: "4.1 MB",
        date: "5 days ago",
        fav: false
    },

    {
        name: "Employee Benefits Guide",
        type: "docx",
        dept: "Human Resources",
        size: "980 KB",
        date: "1 week ago",
        fav: false
    }

];


function toast(text) {

    const element =
        document.getElementById("toast");

    if (!element) return;

    element.textContent = text;

    element.classList.add("show");

    setTimeout(() => {

        element.classList.remove("show");

    }, 2200);

}


/* DOCUMENT HTML */

function docHTML(document, index) {

    return `

        <div class="document">

            <span class="file ${document.type}">
                ${document.type.toUpperCase()}
            </span>

            <div class="doc-info">

                <b>
                    ${document.name}
                </b>

                <small>
                    ${document.dept} · ${document.size}
                </small>

            </div>

            <small>
                ${document.date}
            </small>

            <button
                class="star ${document.fav ? "fav" : ""}"
                data-i="${index}"
            >
                ${document.fav ? "★" : "☆"}
            </button>

        </div>

    `;

}


/* RENDER DOCUMENTS */

function render(target, list) {

    const element =
        document.getElementById(target);

    if (!element) return;

    element.innerHTML =
        list
            .map(document =>
                docHTML(
                    document,
                    docs.indexOf(document)
                )
            )
            .join("");

    bindStars();

}


/* FAVORITE BUTTON */

function bindStars() {

    document
        .querySelectorAll(".star")
        .forEach(button => {

            button.onclick = () => {

                const index =
                    Number(button.dataset.i);

                docs[index].fav =
                    !docs[index].fav;

                const library =
                    document.getElementById("library");

                if (library) {

                    render(
                        "library",
                        filtered()
                    );

                } else {

                    render(
                        "recentDocs",
                        docs.slice(0, 5)
                    );

                }

                toast(
                    docs[index].fav
                        ? "Added to favorites"
                        : "Removed from favorites"
                );

            };

        });

}


/* FILTER */

function filtered() {

    const search =
        (
            document.getElementById("docSearch")
                ?.value || ""
        ).toLowerCase();


    const activeTab =
        document
            .querySelector(".tabs .active")
            ?.dataset.type || "all";


    return docs.filter(document => {

        const matchesSearch =
            (
                document.name +
                " " +
                document.dept
            )
            .toLowerCase()
            .includes(search);


        const matchesType =
            activeTab === "all" ||
            document.type === activeTab;


        return matchesSearch && matchesType;

    });

}


/* DEMO AI RESPONSE */

function answer(question) {

    question =
        question.toLowerCase();


    if (question.includes("remote")) {

        return `
            Remote Work Policy is available in the
            authorized document library. When the RAG
            backend is connected, the exact policy text
            and source will be returned here.
        `;

    }


    if (question.includes("leave")) {

        return `
            The AI will search the authorized HR documents
            for the Annual Leave Policy and return the
            relevant sections with a source citation.
        `;

    }


    if (question.includes("benefit")) {

        return `
            The Employee Benefits Guide is available to
            authorized users. The RAG service will retrieve
            the exact information from that document.
        `;

    }


    return `
        Once connected to the Python/RAG backend,
        I will search only your authorized documents
        and return a grounded answer with sources.
    `;

}


/* PAGE EVENTS */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* LOGIN */

        const login =
            document.getElementById("loginForm");


        if (login) {

            const showPassword =
                document.getElementById(
                    "showPassword"
                );


            showPassword.onclick = () => {

                const password =
                    document.getElementById(
                        "password"
                    );


                if (
                    password.type ===
                    "password"
                ) {

                    password.type =
                        "text";

                    showPassword.textContent =
                        "Hide";

                } else {

                    password.type =
                        "password";

                    showPassword.textContent =
                        "Show";

                }

            };


            document
                .getElementById("forgot")
                .onclick = event => {

                    event.preventDefault();

                    toast(
                        "Password reset will be handled by the backend team."
                    );

                };


            login.onsubmit = event => {

                event.preventDefault();

                const message =
                    document.getElementById(
                        "loginMsg"
                    );


                message.textContent =
                    "Checking approved access...";


                setTimeout(() => {

                    location.href =
                        "dashboard.html";

                }, 500);

            };

        }


        /* LOGOUT */

        const logout =
            document.getElementById(
                "logout"
            );


        if (logout) {

            logout.onclick = () => {

                location.href =
                    "index.html";

            };

        }


        /* NOTIFICATION */

        const bell =
            document.getElementById("bell");


        if (bell) {

            bell.onclick = () => {

                toast(
                    "No new security alerts."
                );

            };

        }


        /* RECENT DOCUMENTS */

        if (
            document.getElementById(
                "recentDocs"
            )
        ) {

            render(
                "recentDocs",
                docs.slice(0, 5)
            );

        }


        /* QUICK SEARCH */

        const searchButton =
            document.getElementById(
                "quickSearchBtn"
            );


        if (searchButton) {

            const search = () => {

                const query =
                    document.getElementById(
                        "quickSearch"
                    ).value;


                location.href =
                    "assistant.html?q=" +
                    encodeURIComponent(query);

            };


            searchButton.onclick =
                search;


            document
                .getElementById("quickSearch")
                .onkeydown = event => {

                    if (
                        event.key ===
                        "Enter"
                    ) {

                        search();

                    }

                };

        }


        /* QUICK SEARCH CHIPS */

        document
            .querySelectorAll("[data-query]")
            .forEach(button => {

                button.onclick = () => {

                    location.href =
                        "assistant.html?q=" +
                        encodeURIComponent(
                            button.dataset.query
                        );

                };

            });


        /* DOCUMENT LIBRARY */

        if (
            document.getElementById(
                "library"
            )
        ) {

            render(
                "library",
                docs
            );


            document
                .getElementById(
                    "docSearch"
                )
                .oninput = () => {

                    const results =
                        filtered();


                    render(
                        "library",
                        results
                    );


                    document
                        .getElementById(
                            "count"
                        )
                        .textContent =
                        `${results.length} authorized documents found`;

                };


            document
                .querySelectorAll(
                    ".tabs button"
                )
                .forEach(button => {

                    button.onclick = () => {

                        document
                            .querySelectorAll(
                                ".tabs button"
                            )
                            .forEach(item => {

                                item.classList.remove(
                                    "active"
                                );

                            });


                        button.classList.add(
                            "active"
                        );


                        document
                            .getElementById(
                                "docSearch"
                            )
                            .dispatchEvent(
                                new Event(
                                    "input"
                                )
                            );

                    };

                });

        }


        /* UPLOAD */

        const choose =
            document.getElementById(
                "choose"
            );


        if (choose) {

            const file =
                document.getElementById(
                    "file"
                );


            const zone =
                document.getElementById(
                    "dropZone"
                );


            choose.onclick = () => {

                file.click();

            };


            file.onchange = () => {

                if (
                    file.files[0]
                ) {

                    document
                        .getElementById(
                            "selected"
                        )
                        .innerHTML = `

                            <p style="
                                font-size:9px;
                                color:#5146e5;
                                margin-top:10px;
                            ">

                                ✓ Selected:
                                ${file.files[0].name}

                            </p>

                        `;


                    document
                        .getElementById(
                            "fileName"
                        )
                        .value =
                        file.files[0]
                            .name
                            .replace(
                                /\.[^.]+$/,
                                ""
                            );

                }

            };


            zone.ondragover =
                event => {

                    event.preventDefault();

                };


            zone.ondrop =
                event => {

                    event.preventDefault();

                    if (
                        event
                            .dataTransfer
                            .files
                            .length
                    ) {

                        file.files =
                            event
                                .dataTransfer
                                .files;

                        file.onchange();

                    }

                };


            document
                .getElementById(
                    "uploadBtn"
                )
                .onclick = () => {

                    const message =
                        document.getElementById(
                            "uploadMsg"
                        );


                    if (
                        !file.files.length
                    ) {

                        message.textContent =
                            "Please choose a document first.";

                        message.style.color =
                            "#dc2626";

                    } else {

                        message.textContent =
                            "Frontend upload prepared. Python backend will handle secure storage, scanning and processing.";

                        message.style.color =
                            "#15803d";

                    }

                };

        }


        /* AI CHAT */

        const chatForm =
            document.getElementById(
                "chatForm"
            );


        if (chatForm) {

            const input =
                document.getElementById(
                    "chatInput"
                );


            const messages =
                document.getElementById(
                    "messages"
                );


            function addMessage(
                text,
                user
            ) {

                const message =
                    document.createElement(
                        "div"
                    );


                message.className =
                    "msg " +
                    (
                        user
                            ? "user"
                            : "ai"
                    );


                message.innerHTML = `

                    <span>
                        ${user ? "A" : "✦"}
                    </span>

                    <div>

                        <b>
                            ${
                                user
                                    ? "You"
                                    : "SecureDoc AI"
                            }
                        </b>

                        <p>
                            ${text}
                        </p>

                    </div>

                `;


                messages.appendChild(
                    message
                );


                messages.scrollTop =
                    messages.scrollHeight;

            }


            chatForm.onsubmit =
                event => {

                    event.preventDefault();


                    const question =
                        input.value.trim();


                    if (!question)
                        return;


                    addMessage(
                        question,
                        true
                    );


                    input.value = "";


                    setTimeout(() => {

                        addMessage(
                            answer(question)
                        );

                    }, 450);

                };


            document
                .querySelectorAll(
                    "[data-q]"
                )
                .forEach(button => {

                    button.onclick =
                        () => {

                            input.value =
                                button.dataset.q;

                            chatForm
                                .requestSubmit();

                        };

                });


            const params =
                new URLSearchParams(
                    location.search
                );


            if (
                params.get("q")
            ) {

                input.value =
                    params.get("q");


                setTimeout(() => {

                    chatForm
                        .requestSubmit();

                }, 250);

            }

        }


        /* PROFILE */

        const profile =
            document.getElementById(
                "profileForm"
            );


        if (profile) {

            profile.onsubmit =
                event => {

                    event.preventDefault();

                    toast(
                        "Profile saved in this frontend demo."
                    );

                };

        }

    }
);

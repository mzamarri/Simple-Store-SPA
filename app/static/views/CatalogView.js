import AbstractView from "../Modules/Views/AbstractView.js";
import { cart } from "../index.js";

export default class extends AbstractView {
    constructor() {
        super();
        super.setTitle("Catalog");
        this.currentPage = 1;
        this.cart = cart;
    }

    async getHtml() {
        this.catalog = await fetch('/get-catalog') // add ternary operation
        .then(res => res.json());

        let productListHTML = this.createProductList();
        let paginationHTML = this.createPagination();
        return `
            <div class="catalog">
                <div class="result-filter">
                    <h2>${this.items.length} of Items</h2>
                    <div>
                        Filter goes here
                    </div>
                </div>
                <div class="game-catalog" id="game-catalog">
                    ${productListHTML}
                </div>
                <div class="pagination" id="catalog-pagination">
                    <ul>
                        ${paginationHTML}
                    </ul>
                </div>
            </div>
        `
    }

    createProductList() {
        let html = "";
        this.catalog.forEach(item => {
            html += `
                <div class="item">
                    <img src="${item.imageSrc}" alt="product photo">
                    <p>${item.description}</p>
                    <h3>$${item.price}</h3>
                    <button class="add-cart" data-id="${item.catalogId}">Add to Cart</button>
                </div>
            `
        })
        return html;
    }

    createPagination() {
        let numOfPages = Math.ceil(this.catalog.length / 50);
        let html = "";
        for (let i = 1; i <= numOfPages; i++) {
            if (i === this.currentPage) {
                html += `<li><a href="/catalog/${i}" class="active">${i}</a></li>`
            } else {
                html += `<li><a href="/catalog/${i}">${i}</a></li>`
            }
        }
        return html;
    }

    selectPage(event) {
        event.preventDefault();
        if (event.target.tagName === "A") {
            event.currentTarget.querySelector("a.active").classList.remove("active");
            event.target.classList.add("active");
            this.currentPage = parseInt(event.target.innerText);
            document.getElementById("game-catalog").innerHTML = this.createProductList();
        }
    }

    setEventListeners() {
        let pagination = document.getElementById("catalog-pagination");
        pagination.addEventListener("click", (e) => this.selectPage(e));

        let addToCartBtn = document.getElementById("game-catalog").querySelectorAll("button.add-cart");
        addToCartBtn.forEach((btn) => {
            btn.addEventListener("click", async () => {
                const url = '/add-items';
                await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        
                    })
                })
                .then(res => res.text())
                .then(data => console.log("successfully retrieved server data"))
                .catch(err => {
                    console.error(err);
                    throw err;
                });
            })
        })
    }
}
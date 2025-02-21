const categoryListing = document.querySelector("#category-listing");

const productListing = document.querySelector("#product-listing");

const searchInp = document.querySelector("#search-inp");


async function getCategories() {
    const response = await fetch('https://dummyjson.com/products/categories');
    const data = await response.json();
    // console.log("data", data);


    // by default not decalare variable so its var(Global) in this use particuler then declare after let(local) 
    for (let d of data) {
        const li = document.createElement("li");
        li.classList.add("shadow-sm", "my-2", "p-2")
        li.innerText = d.name;

        li.addEventListener(
            "click",
            function (e) {
                getProducts(d.url);

                // for to use made li bkg in active mode 
                document.querySelector("#category-listing .active").classList.remove("active");
                e.target.classList.add("active");
            }
        )

        categoryListing.append(li);
    }

}


// Searching function
const searchProducts = async () => {
    const url = `https://dummyjson.com/products/search?q=${searchInp.value}`;
    // console.log(url);
    const response = await fetch(url);  // first url in this then change for to each product 
    const data = await response.json();
    productListing.innerHTML = "";



    // pagination
    console.log(data.total)

    for (prod of data.products) {
        const col = document.createElement("div");
        col.classList.add("col-4", "mb-3");
        col.innerHTML = `
             <div class="card shadow-sm"  style="width: 18rem;">
                            <img src="${prod.thumbnail}"  class="card-img-top" alt="${prod.title}">
                            <div class="card-body">
                                <h5 class="card-title">${prod.title}
                                </h5>
                                <p class="card-text">Price: <strong>$ ${prod.price}</strong> <span class="text-success">(-7.17% Off)</span></p>
                                <p class="card-text">Rating: <strong> ${prod.rating}</strong> ⭐</p>
                                <p class="card-text text-danger">Availability: ${prod.availabiliStatus}</p>
                                <a href="#" class="btn btn-primary w-100">Buy Now</a>
                            </div>
            </div>
            `;
        productListing.append(col);
    }


}



const getProducts = async (url = 'https://dummyjson.com/products') => {
    console.log("URL", url)
    const response = await fetch(url);  // first url in this then change for to each product 
    const data = await response.json();

    productListing.innerHTML = "";

    // console.log(data.products); // u want to get data from by console 
    for (prod of data.products) {
        const col = document.createElement("div");
        col.classList.add("col-4", "mb-3");
        col.innerHTML = `
             <div class="card shadow-sm"  style="width: 18rem;">
                            <img src="${prod.thumbnail}"  class="card-img-top" alt="${prod.title}">
                            <div class="card-body">
                                <h5 class="card-title">${prod.title}</h5>
                                <p class="card-text">Price: <strong>$ ${prod.price}</strong> <span class="text-success">(-7.17% Off)</span></p>
                                <p class="card-text">Rating: <strong> ${prod.rating}</strong> ⭐</p>
                                <p class="card-text text-danger">Availability: ${prod.availabiliStatus}</p>
                                <a href="#" class="btn btn-primary w-100">Buy Now</a>
                            </div>
            </div>
        `;
        productListing.append(col);
    }
}

getProducts();
getCategories();   // init Call

"use strict";
/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

// Let the code run when the dom has been fully created
window.addEventListener('DOMContentLoaded', () => {
    /**
     * Define Global Variables
     * 
    */

    const headerElement = document.querySelector(".page__header");
    const navElement = document.querySelector(".navbar__menu");
    const navListElement = navElement.querySelector("#navbar__list");
    const sectionsList = document.querySelectorAll("main > section");
    let activeSection = document.querySelector(".your-active-class");
    
    /**
     * End Global Variables
     * Start Helper Functions
     * 
    */
    
    function getNearstSectionToTopOfVP() {
        let minimumDistance = document.documentElement.scrollHeight;    // Dummy value to make the first comparison
                                                                        // always true.
        let nearestSection = null;

        for (let section of sectionsList) {
            let distanceToTop = Math.abs(section.getBoundingClientRect().top);
            if (distanceToTop < minimumDistance) {
                minimumDistance = distanceToTop;
                nearestSection = section;
            }
        }

        return nearestSection;
    }
    
    /**
     * End Helper Functions
     * Begin Main Functions
     * 
    */
    
    // build the nav
    const navListFragment = new DocumentFragment();

    for (let section of sectionsList) {
        const navListEntry = document.createElement("li");
        const navLink = document.createElement("a");

        navLink.classList.add("menu__link");
        navLink.setAttribute("href", "#"+section.id)
        navLink.textContent = section.attributes["data-nav"].nodeValue;

        // Select the active link
        if (section.classList.contains("your-active-class")) {
            navLink.classList.add("your-active-class");
        }

        navListEntry.appendChild(navLink);
        navListFragment.appendChild(navListEntry);
    }

    navListElement.appendChild(navListFragment);
    
    // Add class 'active' to section when near top of viewport
    let timeoutIDforScrolling;    // A variable to detect if we are done scrolling

    window.addEventListener("scroll", () => {
        // Show the navigation bar again
        headerElement.classList.remove("hide");

        let nearestSection = getNearstSectionToTopOfVP();

        if (activeSection !== nearestSection) {
            const previousNavLink = document.querySelector(`.menu__link[href="#${activeSection.id}"]`);
            const nextNavLink = document.querySelector(`.menu__link[href="#${nearestSection.id}"]`);

            activeSection.classList.remove("your-active-class");
            previousNavLink.classList.remove("your-active-class");
            nearestSection.classList.add("your-active-class");
            nextNavLink.classList.add("your-active-class");

            activeSection = nearestSection;
        }

        // We are still scrolling, so clear the timeout
        window.clearTimeout( timeoutIDforScrolling );

        // Set a timeout to hide the navbar, but it will only really run when we are done scrolling
        timeoutIDforScrolling = setTimeout(function() {
            headerElement.classList.add("hide");
        }, 2000);
    });
    
    // Scroll to anchor ID using scrollTo event
    navListElement.addEventListener("click", (event) => {
        if (event.target.nodeName == "A") {
            event.preventDefault();

            document.querySelector(event.target.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            })
        }
    })
});
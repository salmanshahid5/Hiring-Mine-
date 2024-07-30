let pageNo = 1;
const loader = document.getElementById('loader');
loader.style.display = 'block'
fetch('https://backend-prod.app.hiringmine.com/api/jobAds/all?limit=40&pageNo=${pageNo}2&keyWord=&category=')
    .then(res => res.json())
    .then(data => {
        const result = data.data;
        console.log(result);

        const jobs = document.getElementById('job');
        console.log(jobs);
        result.forEach(element => {

            let salaryText;
            if (element.payRangeStart == '' || element.payRangeEnd == '' || element.payRangeStart == null || element.payRangeEnd == null) {
                salaryText = 'No Salary Mentioned'
            }
            else {
                salaryText = "RS" + element.payRangeStart + '-' + element.payRangeEnd;
            }
            jobs.innerHTML += `<div class="jobCard">
            <div class="job">
                <div class="jobDetail1">
                    <h5>${element.companyName ? element.companyName : "Anonymous"}</h5>
                    <span>${element.designation}</span>
                    <p class="color">${salaryText}</p>
                </div>
                <div class="jobImage">
                    <img src="images/icon.png" alt="">
                </div>
            </div>
            <div class="jobMonth">
                <div class="month">
                    <p>${moment(element.updatedAt).fromNow()}</p>
                </div>
                <div class="view">
                    <p>${element.views || 0} views</p>
                </div>
            </div>
        </div>
    </div> `
        });
    })
    .catch(error => console.log('Error fetching products:', error))
    .finally(() => {
        loader.style.display = 'none';
    });

    window.addEventListener('scroll',()=>{
        if(window.innerHeight + window.scroll >= document.body.offsetHeight - 500){
            pageNo++;
        }
    })
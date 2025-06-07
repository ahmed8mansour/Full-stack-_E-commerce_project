// هادي ملاحظات بنستخلصها من كل مشروع 
// 1--- bootstrap gutters  اهم ملاحظة الا وهي ال 
// -- بين الكولومس  gap هلقيت كيف بدي تخلي مسافة بين الكاردس او كيف بدك تعمل 

// بتنضاف للكولومس يعني شوف صديقي العزيز  padding الجاب هما عبارة عن 

<div className='row gx-3'>


    {/* هان هتلاقي معمول للكول شوية بادينج */}
    <div className='col-4' > 
        {/* كونتنت الكولوم بيكون في الداخل يا وحش  */}
        <div className='card' style={{backgroundColor:"red" , height:"100px" }}>
        </div>
    </div>
    {/* ممنوع يكون اي كلاس جنب الكولم هان بالمرة ممنوع */}
    <div className='col-8' >
        <div className='card ' style={{backgroundColor:"black" , height:"100px"}}>
        </div>
    </div>




</div>


// row 
//  ----- col-4 inside it card 
//  ----- col-8 inside it card 

// col-4.card.products_card (false) the gutter will not appearing
// col-4 >> card.products_card (True) the gutter will apear
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Products', [
       {
         description: 'Fender regularly has chic, limited edition guitars made in Japan. These high quality instruments convince through noble optics, best components and first-class workmanship. Paisley Teles have become true Fender icons - now also available in cool Black Paisley! The maple/rosewood neck is screwed to the lime tree body. On the top and pickguard is the legendary Paisley graphic. The hardware is classic: 3 tabs Ashtray bridge and vintage tuners. An American Vintage 58 Tele pickup set provides classic Tele Twang.',
         id: '51e8d8bc-df5c-4dc7-a4e9-9d704dcf3934',
         price: 1147,
         title: 'Fender Black Paisley Tele Special Edition',
         imageUrl: 'https://sc1.musik-produktiv.com/pic-010122760l/fender-black-paisley-tele-special-edition.jpg'
       },
       {
         description: 'The guitars of the Deluxe-series represents ultimate LTD - Top class and are not only visibly but also, as far as quality goes, leaning on the shoulder of the ESP custom-series.\n\nThe Korean copies of the expensive ESP guitars are built with the same care and technical know how as the signature or standard series from the japanese noble brand LTD by ESP.\nSince the founding of the company in 1975 by Hisatake Shibuya, ESP have become a renowned manufacture of high-end guitars and basses. The list of worldwide ESP endorsees is also impressive. Bands such as Metallica, Rolling Stones, Rammstein, Sepultura and Children of Bodom are just a few who are role models for many musicians.',
         id: 'ce826919-bc60-4f5a-aa06-87b0fd3912b8',
         price: 881,
         title: 'ESP LTD Deluxe EC-1000 VB SD',
         imageUrl: 'https://sc1.musik-produktiv.com/pic-010056154l/esp-ltd-deluxe-ec-1000-vb-sd.jpg'
       },
       {
         description: 'RGs are built for speed, comfort, tone and sustain, and a 24-Fret style of play for creativity and expression. The RG-series grew up with the Metal genre and now sets the standard twenty years later for Metal and Rock players.',
         id: '7545e8e1-18fc-4f62-8500-1d714375e3d2',
         price: 328,
         title: 'Ibanez RG421EX-BKF',
         imageUrl: 'https://sc1.musik-produktiv.com/pic-010077312l/ibanez-rg421ex-bkf.jpg'
       },
       {
         description: 'The look and the feel of a well used guitar has always had a charm of its own. Until now there were only three possibilities of getting such a Fender: Be patient and keep playing your own Fender until it has the required look, pay a considerable amount for a "Custom Shop" relic or pay even more for an old original! Fenders new "Road worn" series now saves the inclined guitarists a lot of time and even more money. The body is varnished with nitrocellulose lacquer and is equipped with TexMex pickups. The fretboards use 6105 fretwire and give the guitars that sound and that feel, as if they have been on the road for years!',
         id: 'cc8c3759-3dd3-44c6-bb8a-d984c3276e0c',
         price: 1039,
         title: 'Fender Road Worn \'60s Stratocaster PF LPB',
         imageUrl: 'https://sc1.musik-produktiv.com/pic-010123760l/fender-road-worn-60s-stratocaster-pf-lpb.jpg'
       },
       {
         description: 'The 2018 Gibson Les Paul Standard in traditional garb. Splittable Burstbucker Pro do their job here and - not so traditional - locking mechanics.\n\n2018 Gibson has done a lot again. In principle, the program of Gibson USA has been a little streamlined and optimised. High Performance models are only available as Les Paul Standard and SG Standard. Some models are available in only one or two colour versions, other models have been completely deleted from the program.',
         id: '36910a68-5150-4b49-9215-40f40046f295',
         price: 2541,
         title: 'Gibson Les Paul Standard Blood Orange Burst',
         imageUrl: 'https://sc1.musik-produktiv.com/pic-010099412l/gibson-les-paul-standard-blood-orange-burst.jpg'
       },
       {
         description: 'The Gibson SG Special 2019, this time with P90 and wraparound tailpiece and in Pelham Blue..',
         id: 'deebe831-0396-4108-9e4d-b732e586ac9e',
         price: 1174,
         title: 'Gibson SG Special Faded Pelham Blue',
         imageUrl: 'https://sc1.musik-produktiv.com/pic-010110471l/gibson-sg-special-faded-pelham-blue.jpg'
       },
       {
         description: 'In the hairspray metal era at the end of the 80s, so-called superstrats were popular - strats with a humbucker on the bridge, flat, wide necks, Floyd Rose tremolos and embarrassing, shrill paintwork. Ibanez, Charvel, Jackson, etc. were the hot guitar companies for this genre. Fender also wanted a piece of the cake and followed up with the HM (Heavy Metal) Strat. This guitar series is again available as a 2020 limited edition and offers everything that was popular in the late 80s: linden body, ultra-flat neck with 17" fretboard radius, Floyd Rose tremolo and shrill paintwork.',
         id: '450f220a-b475-4bcf-8d58-58be97162283',
         price: 1057,
         title: 'Fender HM Strat Ice Blue',
         imageUrl: 'https://sc1.musik-produktiv.com/pic-010119355l/fender-hm-strat-ice-blue.jpg'
       },
       {
         description: 'The Epiphone LP Classic series is a somewhat up market version of the LP standard. Flat 60\'s style slim taper neck, Mahogany body with a AAA Flamed Maple veneer top and nice strong Ceramic Humbuckers. Nice to look at and a nice powerful sound!\nThe Epiphione LP Classic now features the innovative Min-ETune Tuining system. Always the correct tuning at the press of a button. The Min-ETun also offers Twelve presets with alternative Tuning (dropped and open tuning).',
         id: '1efabd17-97c1-485e-8ec8-fbfd1d05ee3c',
         price: 439,
         title: 'Epiphone Modern Les Paul Classic Ebony',
         imageUrl: 'https://sc1.musik-produktiv.com/pic-010119767l/epiphone-modern-les-paul-classic-ebony.jpg'
       },
       {
         description: 'The modern Les Paul in modern colors offers weight reduction, ProBuckers with split function, phase and treble bleed switching and an ebony fingerboard. Here in the Figured Top version with AAA Flame Maple top.',
         id: '6e04e880-bd3c-425d-8d89-9515d5073e22',
         price: 619,
         title: 'Epiphone Les Paul Modern Figured Caribbean Blue Fade',
         imageUrl: 'https://sc1.musik-produktiv.com/pic-010120702l/epiphone-les-paul-modern-figured-caribbean-blue-fade.jpg'
       }
     ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Products', null, {});
  }
};

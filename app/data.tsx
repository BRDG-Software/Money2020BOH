// Mock data matching the new API structure (limited to 20 items)
// export const orderData: Order[] = [
//   {
//     id: 778,
//     kiosk_id: 22,
//     status: "completed",
//     user_profile: null,
//     created_at: "2025-08-07T20:53:22.239Z",
//     completed_at: null,
//     survey_response: null,
//     kiosk_type: "sweet",
//     items: [
//       {
//         id: 1394,
//         order_id: 778,
//         item_id: 1,
//         customizations: null,
//         created_at: "2025-08-07T20:53:22.239Z",
//         name: "Dark Chocolate Sea Salt Caramels",
//         description:
//           "Rich and creamy caramels dipped in superfine dark chocolate, with just a kiss of sea salt. A perfect mix of salty and sweet!",
//       },
//     ],
//   },
//   {
//     id: 777,
//     kiosk_id: 22,
//     status: "completed",
//     user_profile: null,
//     created_at: "2025-08-07T20:30:21.107Z",
//     completed_at: null,
//     survey_response: null,
//     kiosk_type: "sweet",
//     items: [
//       {
//         id: 1393,
//         order_id: 777,
//         item_id: 2,
//         customizations: null,
//         created_at: "2025-08-07T20:30:21.107Z",
//         name: "Champagne Bubbles",
//         description:
//           "Dressed up in tiny non-pareil sprinkles, these juicy gummies are flavored like a fine champagne – delicate and sweet. Non-alcoholic.",
//       },
//     ],
//   },
//   {
//     id: 776,
//     kiosk_id: 22,
//     status: "pending",
//     user_profile: null,
//     created_at: "2025-08-07T20:15:10.500Z",
//     completed_at: null,
//     survey_response: null,
//     kiosk_type: "sweet",
//     items: [
//       {
//         id: 1392,
//         order_id: 776,
//         item_id: 3,
//         customizations: null,
//         created_at: "2025-08-07T20:15:10.500Z",
//         name: "Summer Strawberries",
//         description: "Fresh and juicy strawberries with a hint of sweetness",
//       },
//     ],
//   },
//   {
//     id: 775,
//     kiosk_id: 22,
//     status: "pending",
//     user_profile: null,
//     created_at: "2025-08-07T20:00:05.300Z",
//     completed_at: null,
//     survey_response: null,
//     kiosk_type: "sweet",
//     items: [
//       {
//         id: 1391,
//         order_id: 775,
//         item_id: 4,
//         customizations: null,
//         created_at: "2025-08-07T20:00:05.300Z",
//         name: "Island Pineapples",
//         description: "Tropical pineapple flavor with a refreshing taste",
//       },
//     ],
//   },
//   {
//     id: 774,
//     kiosk_id: 22,
//     status: "completed",
//     user_profile: null,
//     created_at: "2025-08-07T19:45:30.800Z",
//     completed_at: "2025-08-07T19:50:30.800Z",
//     survey_response: null,
//     kiosk_type: "sweet",
//     items: [
//       {
//         id: 1390,
//         order_id: 774,
//         item_id: 5,
//         customizations: null,
//         created_at: "2025-08-07T19:45:30.800Z",
//         name: "Magic Mango",
//         description: "Exotic mango flavor that's both sweet and tangy",
//       },
//     ],
//   },
// ];
export const juiceData = [
  {
    name: "Roots With Ginger",
    available: true,
    id: 1,
  },
  {
    name: "Avocado Greens Smoothie",
    available: true,
    id: 2,
  },
  {
    name: "Strawberry Basil Lemonade",
    available: false,
    id: 3,
  },
  {
    name: "Snack #1",
    available: true,
    id: 4,
  },
  {
    name: "Snack #2",
    available: false,
    id: 5,
  },
  {
    name: "Snack #3",
    available: false,
    id: 6,
  },
  {
    name: "Tumbler Cup",
    available: true,
    id: 7,
  },
];
export const sugarfinaData = [
  {
    name: "Smoothie Flavour #1",
    available: true,
    id: 1,
  },
  {
    name: "Island Pineapples",
    available: true,
    id: 2,
  },
  {
    name: "Magic Mangos",
    available: true,
    id: 3,
  },
];

const fakeWallet = () => ({
  __typename: 'Wallet',
  id: '123213',
  balance: 100000,
  owner: '4234',
})

const fakeWallet2 = () => ({
  __typename: 'Wallet',
  id: 'dfghdfghdfhg',
  balance: 100000,
  owner: '4255',
})

const fakeUser = () => ({
  __typename: 'User',
  id: '4234',
  name: 'Miss Hilda Fahey',
  email: 'Satterfield.Horacio@gmail.com',
  role: 'admin',
  offers: [],
  cart: [],
  wallet: fakeWallet(),
})

const fakeUser2 = () => ({
  __typename: 'User',
  id: '4255',
  name: 'Mrs. Xzavier Mueller',
  email: 'Miller_Reichert@yahoo.com',
  role: 'admin',
  offers: [],
  cart: [],
  wallet: fakeWallet(),
})

const fakePokemon = () => ({
  __typename: 'Pokemon',
  id: 1,
  name: 'bulbasaur',
  url: 'https://pokeapi.co/api/v2/pokemon/1/',
  image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.pg',
  pokeType: ['grass'],
})

const fakePokemonOffer = () => ({
  __typename: 'PokemonOffer',
  id: '618726387213',
  name: 'bulbasaur',
  price: 1000,
  description: 'It is a fake pokemonOffer description',
  pokemon: fakePokemon(),
  seller: fakeUser(),
  createdAt: '2019-06-20T20:38:07.889+00:00',
})

const fakeCartItem = () => ({
  __typename: 'CartItem',
  id: '5d0d361471e9af00178faea2',
  quantity: 1,
  pokemon: fakePokemon(),
  user: fakeUser(),
})

const fakeOrderItem = (changes) => ({
  __typename: 'OrderItem',
  id: '5d0bef4b49cbfc0017dce192',
  quantity: 1,
  price: 1000,
  pokemon: fakePokemon(),
  user: fakeUser(),
  seller: fakeUser2(),
  ...changes,
})

const fakeOrder = () => ({
  __typename: 'Order',
  id: '5d0bef4b49cbfc0017dce193',
  price: 10000,
  user: fakeUser(),
  items: [fakeOrderItem(), fakeOrderItem({ id: '5d0bf3a549cbfc0017dce199' })],
})

export {
  fakeUser,
  fakeUser2,
  fakeWallet,
  fakePokemon,
  fakePokemonOffer,
  fakeCartItem,
  fakeOrderItem,
  fakeOrder,
}
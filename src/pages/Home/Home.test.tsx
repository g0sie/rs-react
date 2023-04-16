import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { screen, fireEvent } from '@testing-library/react';

import { renderWithProvider } from '../../utils/renderWithProvider';

import Home from './Home';

const response = {
  pagination: {
    last_visible_page: 1,
    has_next_page: false,
    current_page: 1,
    items: { count: 3, total: 3, per_page: 25 },
  },
  data: [
    {
      mal_id: 47487,
      url: 'https://myanimelist.net/character/47487/Kakashi',
      images: {
        jpg: { image_url: 'https://cdn.myanimelist.net/images/characters/3/130529.jpg' },
        webp: {
          image_url: 'https://cdn.myanimelist.net/images/characters/3/130529.webp',
          small_image_url: 'https://cdn.myanimelist.net/images/characters/3/130529t.webp',
        },
      },
      name: 'Kakashi',
      name_kanji: '\u30ab\u30ab\u30b7',
      nicknames: [],
      favorites: 14,
      about:
        'Kakashi is a high school student that is the only one in the world who has the power to fight aliens. He had lost all his memories but is pretending to be tough. \n\n(Source: Sentai Filmworks)',
    },
    {
      mal_id: 85,
      url: 'https://myanimelist.net/character/85/Kakashi_Hatake',
      images: {
        jpg: { image_url: 'https://cdn.myanimelist.net/images/characters/7/284129.jpg' },
        webp: {
          image_url: 'https://cdn.myanimelist.net/images/characters/7/284129.webp',
          small_image_url: 'https://cdn.myanimelist.net/images/characters/7/284129t.webp',
        },
      },
      name: 'Kakashi Hatake',
      name_kanji: '\u306f\u305f\u3051 \u30ab\u30ab\u30b7',
      nicknames: ['The Copy Ninja'],
      favorites: 46050,
      about:
        'Age: 26\u201327 (Part I); 29\u201331 (Part II)\nBirthday: September 15\nHoroscope: Virgo\nBlood type: O\nHeight: 5"11"\nWeight: 67.5 kg \nHair: Silver\nEyes: Grey, Sharingan\nRank: Jonin, Former ANBU\nLikes: Icha-Icha series, Broiled Saury with salt, Miso soup with eggplant\nDislikes: Anything sweet\nQuote: (from Obito) "A shinobi who violates the rules is scum, but a shinobi who abandons their friends is worse than scum."\n\nMajor Background Spoilers\n\nKakashi has an ongoing, albeit slightly one-sided, rivalry with Might Guy, with Guy constantly proclaiming that Kakashi is his rival, and considering his and Kakashi\'s subordinates rivals. Kakashi, however, seems indifferent to their rivalry, which annoys Guy to no end. Guy randomly challenges Kakashi to contests of skill, and Kakashi has acquired a record of 49 wins and 50 losses in doing so. Given that the contests that make up this figure are so varied (ranging from Rock, Paper, Scissors to sumo-wrestling), this is not much of an achievement on Guy\'s part. Nevertheless, Guy is proud of his record.\n\nThough he evasively says that he has "many hobbies" when asked about himself, he is commonly seen reading of "Icha Icha Paradise" (\u30a4\u30c1\u30e3\u30a4\u30c1\u30e3\u30d1\u30e9\u30c0\u30a4\u30b9, Icha Icha Paradaisu, literally "Make Out Paradise"), an adult and probably pornographic novel authored by Jiraiya that is a runaway bestseller in the Naruto world. Kakashi most prominently reads it while training and speaking with his team, and is later seen reading the second known volume in the series, "Icha Icha Violence" (\u30a4\u30c1\u30e3\u30a4\u30c1\u30e3\u30d0\u30a4\u30aa\u30ec\u30f3\u30b9, Icha Icha Baiorensu, literally "Make Out Violence"). In Part II Naruto gives him the new "Icha Icha Tactics" (\u30a4\u30c1\u30e3\u30a4\u30c1\u30e3\u30bf\u30af\u30c6\u30a3\u30af\u30b9, Icha Icha Takutikusu, literally "Make Out Tactics").\n\nKakashi\'s Sharingan eye gives him a significant advantage in battle, as he can copy enemy techniques and use them as his own, as well as track and predict his opponent\'s movements flawlessly. Because it is a transplanted eye, his Sharingan eye is always active. While this would not be much of a problem for an Uchiha, his non-Uchiha blood causes it to use much more chakra than it should. Because of this, he covers it with his headband and only utilizes it in the most dangerous battles. Kakashi\'s use of the Sharingan is as good as that of Itachi Uchiha, though the aforementioned handicaps brought about by the nature of his eye make him somewhat weaker in comparison. In Part II Kakashi is able to develop his own Mangekyo Sharingan. With his variant he is able to manipulate space-time to conduct long range attacks, and in its two uses has been capable of severing another\'s arms and otherwise sending things to different dimensions. Much like the standard Sharingan, the Mangekyo Sharingan tires Kakashi considerably, and after using it only three times he was hospitalized for a week due to its chakra usage.\n\nWith his Sharingan Kakashi has been able to copy more than one thousand jutsu, giving him the nickname "Copy Ninja Kakashi". As a result, Kakashi\'s arsenal most prominently features ninjutsu abilities and has led to him becoming a specialist in the field. Many of the jutsu he has been seen copying in the series are water-based attacks, though most of these he only uses against the person he copies them from. He does, however, use Water Release: Water Encampment Wall on occasion as a way to block attacks. He less frequently uses other elemental attacks such as Fire Release: Great Fireball Technique to attack opponents or Earth Release: Inner Decapitation Technique (\u571f\u9041\u30fb\u5fc3\u4e2d\u65ac\u9996\u306e\u8853, Doton: Shinj\u016b Zanshu no Jutsu, Viz "Groundhog Technique Decapitation", English TV "Headhunter Jutsu") to pull opponents below ground and immobilize them. He can also create shadow clones, though because he lacks Naruto\'s chakra reserves, he exercises the ability with caution, rarely creating more than one at a time.\n\nWhile Kakashi specializes in the use of ninjutsu due to his Sharingan he is fairly adept with other jutsu types, though his use of them is rarely seen. Demonic Illusion: Hell Viewing Technique (\u9b54\u5e7b\u30fb\u5948\u70d9\u898b\u306e\u8853, Magen: Narakumi no Jutsu) causes his opponent to see what they would find a horrifying vision, keeping them preoccupied until they can overcome the illusion. A Thousand Years of Pain (death in english dub) (\u5343\u5e74\u6bba\u3057, Sennen Goroshi) consists of Kakashi forcefully plunging his index and middle fingers into an opponent\'s rectum. While only capable of launching the opponent humorous distances in typical uses, the fingers can be replaced with kunai attached with exploding tags to actually do damage to the person one is attacking.\n\nWhen he was younger, Kakashi was taught how to use the Rasengan by the Fourth Hokage. Because the Rasengan is meant to have the user\'s chakra nature mixed with it, Kakashi attempted to add his lightning-based chakra to it, though was ultimately unsuccessful. In time he instead created the Chidori, his only original jutsu. After the jutsu\'s initial creation, Kakashi was unable to use the Chidori to its full potential as the sheer speed of the attack left his normal eyes unable to see any form of an enemy counterattack. After acquiring the Sharingan, however, he was able to overcome this shortcoming. Through repeated use and increased proficiency with it, Kakashi\'s Chidori has been upgraded and renamed to the Lightning Blade due to him having cut through a bolt of lightning with it.',
    },
    {
      mal_id: 1586,
      url: 'https://myanimelist.net/character/1586/Kakashi_no_Keishin',
      images: {
        jpg: { image_url: 'https://cdn.myanimelist.net/images/characters/8/119254.jpg' },
        webp: {
          image_url: 'https://cdn.myanimelist.net/images/characters/8/119254.webp',
          small_image_url: 'https://cdn.myanimelist.net/images/characters/8/119254t.webp',
        },
      },
      name: 'Kakashi no Keishin',
      name_kanji: '\u6848\u5c71\u5b50\u306e\u6075\u4fe1',
      nicknames: [],
      favorites: 2,
      about:
        'The strongman of the Yuyama troupe, Kakashi is a good-hearted person who joined the group for a similar reason to Shiranui. \n\n(Source: Wikipedia)',
    },
  ],
};

const server = setupServer(
  rest.get('https://api.jikan.moe/v4/characters?q=kakashi', (req, res, ctx) => {
    return res(ctx.json(response));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Home', () => {
  it('Searches for cards successfully', async () => {
    renderWithProvider(<Home />);
    const searchBar = screen.getByRole('textbox');

    fireEvent.change(searchBar, { target: { value: 'kakashi' } });
    fireEvent.submit(searchBar);

    await screen.findAllByTestId('card');
    expect(screen.getByText('Kakashi')).toBeDefined();
    expect(screen.getByText('Kakashi Hatake')).toBeDefined();
    expect(screen.getByText('Kakashi no Keishin')).toBeDefined();
    expect(screen.getAllByTestId('card').length).toEqual(3);
  });
});

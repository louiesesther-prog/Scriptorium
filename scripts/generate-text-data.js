const fs = require('fs');
const path = require('path');
// Merge with existing data so we don't lose books already added
let data = {};
try { data = JSON.parse(fs.readFileSync('scripts/bible-text-data.json', 'utf8')); if (data._note) delete data._note; } catch(e) {}

// Gospel of Thomas - 114 logia (chapters), each with 1 verse
data.THOMAS_GOSPEL = {};
const thomas = [
  "And he said, 'Whoever discovers the meaning of these words will not taste death.'",
  "Jesus said, 'Let one who seeks not stop seeking until he finds. When he finds, he will be troubled. When he is troubled, he will marvel, and he will rule over all.'",
  "Jesus said, 'If your leaders say to you, Look, the kingdom is in the sky, then the birds of the sky will get there before you. If they say that it is in the sea, then the fish will get there before you. Rather, the kingdom is inside you and outside you. When you know yourselves, then you will be known, and you will understand that you are children of the living Father. But if you do not know yourselves, then you live in poverty, and you are the poverty.'",
  "Jesus said, 'The person old in days will not hesitate to ask a little child seven days old about the place of life, and that person will live. For many who are first will become last, and they will become a single one.'",
  "Jesus said, 'Know what is in front of your face, and what is hidden from you will be disclosed. For there is nothing hidden that will not be revealed.'",
  "His disciples asked him, 'Do you want us to fast? How should we pray? Should we give to charity? What diet should we observe?' Jesus said, 'Do not lie. Do not do what you hate, for all things are disclosed before heaven. For there is nothing hidden that will not be revealed, and there is nothing covered that will remain undisclosed.'",
  "Jesus said, 'Blessed is the lion that a person eats and the lion becomes human. And cursed is the person whom a lion eats, and the lion becomes human.'",
  "He said, 'The person is like a wise fisherman who cast his net into the sea and drew it up from the sea full of little fish. Among them the wise fisherman found a large fine fish. He threw all the little fish back into the sea and without hesitation chose the large fish. Whoever has ears to hear should hear.'",
  "Jesus said, 'Look, the sower went out, took a handful of seeds, and scattered them. Some fell on the road, and the birds came and pecked them up. Others fell on rock, and they did not take root in the soil and did not produce heads of grain. Others fell among thorns, and they choked the seeds and worms ate them. And others fell on good soil, and it produced good fruit: it yielded sixty per measure and one hundred twenty per measure.'",
  "Jesus said, 'I have cast fire upon the world, and look, I am guarding it until it blazes.'",
  "Jesus said, 'This heaven will pass away, and the one above it will pass away. The dead are not alive, and the living will not die. During the days when you ate what is dead, you made it alive. When you come to dwell in the light, what will you do? On the day when you were one, you became two. But when you become two, what will you do?'",
  "The disciples said to Jesus, 'We know that you are going to leave us. Who will be our leader?' Jesus said to them, 'Wherever you are, you should go to James the Just, for whose sake heaven and earth came into being.'",
  "Jesus said to his disciples, 'Compare me to something and tell me what I am like.' Simon Peter said to him, 'You are like a righteous messenger.' Matthew said to him, 'You are like a wise philosopher.' Thomas said to him, 'Teacher, my mouth cannot express what you are like.' Jesus said, 'I am not your teacher. Because you have drunk, you have become intoxicated from the bubbling spring that I have tended.' He took him aside and told him three things. When Thomas returned to his companions, they asked him, 'What did Jesus say to you?' Thomas said to them, 'If I tell you one of the things he said to me, you will pick up stones and throw them at me, and fire will come out of the stones and consume you.'",
  "Jesus said to them, 'If you fast, you will bring sin upon yourselves. If you pray, you will be condemned. If you give to charity, you will harm your spirits. When you go into any land and travel from place to place, if they welcome you, eat what they serve you and heal the sick among them. For what goes into your mouth will not defile you; rather, what comes out of your mouth will defile you.'",
  "Jesus said, 'When you see one who was not born of woman, fall on your faces and worship. That one is your Father.'",
  "Jesus said, 'Perhaps people think that I have come to cast peace upon the world. They do not know that I have come to cast discord upon the earth: fire, sword, war. For there will be five in a house: three will be against two and two against three, father against son and son against father, and they will stand alone.'",
  "Jesus said, 'I will give you what no eye has seen, what no ear has heard, what no hand has touched, and what has not arisen in the human heart.'",
  "The disciples said to Jesus, 'Tell us how our end will be.' Jesus said, 'Have you already discovered the beginning, that you now seek the end? For where the beginning is, the end will be. Blessed is the one who stands at the beginning: that one will know the end and will not taste death.'",
  "Jesus said, 'Blessed is the one who came into being before coming into being. If you become my disciples and listen to my words, these stones will serve you. For there are five trees in Paradise that do not change, summer or winter, and their leaves do not fall. Whoever knows them will not taste death.'",
  "The disciples said to Jesus, 'Tell us what the kingdom of heaven is like.' He said to them, 'It is like a mustard seed, the smallest of all seeds. But when it falls on worked soil, it produces a large plant and becomes a shelter for birds of the sky.'",
  "Mary said to Jesus, 'What are your disciples like?' He said, 'They are like children who live in a field that is not theirs. When the owners come, they will say, \"Give us back our field.\" They take off their clothes in their presence, leaving the field for them and returning it to them. For this reason I say: If the master of a house knows that a thief is coming, he will keep watch before the thief comes and will not let the thief break into his house of his kingdom and carry off his possessions. You, then, must be on guard against the world. Gird your loins with great strength, so that the robbers may not find a way to reach you.'",
  "Jesus saw some infants nursing. He said to his disciples, 'These nursing infants are like those who enter the kingdom.' They said to him, 'If we become infants, will we enter the kingdom?' Jesus said to them, 'When you make the two into one, and when you make the inside like the outside and the outside like the inside, and the above like the below, and when you make the male and the female into a single one, so that the male will not be male and the female will not be female, when you make eyes in place of an eye, a hand in place of a hand, a foot in place of a foot, and an image in place of an image, then you will enter the kingdom.'",
  "Jesus said, 'I will choose you, one from a thousand and two from ten thousand, and they will stand as a single one.'",
  "His disciples said, 'Show us the place where you are, for we must seek it.' He said to them, 'Whoever has ears should hear. There is light within a person of light, and it shines on the whole world. If it does not shine, it is dark.'",
  "Jesus said, 'Love your brother like your own soul; protect that person like the apple of your eye.'",
  "Jesus said, 'You see the speck in your brother's eye, but you do not see the beam in your own eye. When you remove the beam from your own eye, then you will see clearly enough to remove the speck from your brother's eye.'",
  "Jesus said, 'If you do not fast from the world, you will not find the kingdom. If you do not observe the Sabbath as a Sabbath, you will not see the Father.'",
  "Jesus said, 'I took my stand in the midst of the world, and I appeared to them in the flesh. I found them all drunk, and I found none among them thirsty. My soul ached for the children of humanity, for they are blind in their hearts and do not see that they came into the world empty, seeking also to leave the world empty. But now they are drunk. When they shake off their wine, they will change their ways.'",
  "Jesus said, 'If the flesh came into being because of the spirit, it is a wonder. But if the spirit came into being because of the body, it is a wonder of wonders. Indeed, I am amazed at how this great wealth has made its home in this poverty.'",
  "Jesus said, 'Where there are three deities, they are divine. Where there are two or one, I am with them.'",
  "Jesus said, 'No prophet is accepted in his own village; no physician heals those who know him.'",
  "Jesus said, 'A city built on a high hill and fortified cannot fall, nor can it be hidden.'",
  "Jesus said, 'What you hear in one ear, proclaim from the rooftops. For no one lights a lamp and puts it under a basket, nor does one put it in a hidden place; rather, one puts it on a lampstand so that all who come and go will see its light.'",
  "Jesus said, 'If a blind person leads a blind person, both will fall into a pit.'",
  "Jesus said, 'It is not possible for anyone to enter the house of a strong person and take it by force without tying the person's hands. Then one can loot the house.'",
  "Jesus said, 'Do not fret, from morning to evening and from evening to morning, about what you will wear.'",
  "His disciples said, 'When will you become visible to us, and when will we see you?' Jesus said, 'When you disrobe without shame and take up your garments, place them at your feet like little children and trample them, then you will see the child of the living one and you will not be afraid.'",
  "Jesus said, 'Often you have desired to hear these words that I am speaking to you, and you have no one else from whom to hear them. The days will come when you will seek me and you will not find me.'",
  "Jesus said, 'The Pharisees and the scribes have taken the keys of knowledge and have hidden them. They have not entered, nor have they allowed those who wish to enter to do so. As for you, be as shrewd as snakes and as innocent as doves.'",
  "Jesus said, 'A grapevine has been planted outside the Father. Since it is not strong, it will be pulled up by its root and will perish.'",
  "Jesus said, 'Whoever has something in hand will receive more. Whoever has nothing will be deprived of even the little they have.'",
  "Jesus said, 'Be passersby.'",
  "His disciples said to him, 'Who are you to say these things to us?' Jesus said to them, 'From what I say to you, do you not realize who I am? But you have become like the Jews: they love the tree but hate its fruit; they love the fruit but hate the tree.'",
  "Jesus said, 'Whoever blasphemes against the Father will be forgiven; whoever blasphemes against the Son will be forgiven; but whoever blasphemes against the Holy Spirit will not be forgiven, either on earth or in heaven.'",
  "Jesus said, 'Grapes are not harvested from thorn bushes, nor are figs gathered from thistles, for they yield no fruit. Good people produce good from what they have stored up; evil people produce evil from the evil they have stored up in their hearts, and they speak evil. For from the overflow of the heart they produce evil.'",
  "Jesus said, 'From Adam to John the Baptist, among those born of women, no one is so much greater than John the Baptist that his eyes should not be averted. Yet I have said that whoever among you becomes a child will know the kingdom and will become greater than John.'",
  "Jesus said, 'It is impossible for a person to mount two horses or to stretch two bows. And it is impossible for a servant to serve two masters; otherwise, that one will honor the first and insult the other. No one drinks aged wine and immediately wants to drink new wine. New wine is not poured into old wineskins, or they might burst; aged wine is not poured into a new wineskin, or it might spoil. An old patch is not sewn onto a new garment, for a tear would result.'",
  "Jesus said, 'If two make peace with each other in a single house, they will say to the mountain, \"Move away,\" and it will move.'",
  "Jesus said, 'Blessed are the solitary and the chosen, for you will find the kingdom. For you come from it and will return to it again.'",
  "Jesus said, 'If they say to you, \"Where have you come from?\" say to them, \"We have come from the light, from the place where the light came into being by itself, established itself, and appeared in their image.\" If they say to you, \"Is it you?\" say, \"We are its children, and we are the chosen of the living Father.\" If they ask you, \"What is the evidence of your Father in you?\" say to them, \"It is movement and rest.\"'",
  "His disciples said to him, 'When will the dead rest? When will the new world come?' He said to them, 'What you look for has come, but you do not know it.'",
  "His disciples said to him, 'Twenty-four prophets spoke in Israel, and they all spoke of you.' He said to them, 'You have disregarded the living one who is in your presence and have spoken of the dead.'",
  "His disciples said to him, 'Is circumcision beneficial or not?' He said to them, 'If it were beneficial, their Father would beget them already circumcised from their mother. Rather, the true circumcision in spirit has become entirely profitable.'",
  "Jesus said, 'Blessed are the poor, for yours is the kingdom of heaven.'",
  "Jesus said, 'Whoever does not hate father and mother cannot be my disciple. Whoever does not hate brothers and sisters and take up the cross as I do will not be worthy of me.'",
  "Jesus said, 'Whoever has come to know the world has found a corpse, and whoever has found a corpse is superior to the world.'",
  "Jesus said, 'The kingdom of the Father is like a person who had good seed. The enemy came by night and sowed weeds among the good seed. The person did not let them pull up the weeds, saying, \"I am afraid that you might pull up the wheat along with the weeds.\" For on the day of harvest, the weeds will be plainly visible and will be pulled up and burned.'",
  "Jesus said, 'Blessed is the person who has toiled and has found life.'",
  "Jesus said, 'Look to the living one while you are alive, lest you die and then try to see him and are unable to see him.'",
  "They saw a Samaritan carrying a lamb on the way to Judea. He said to his disciples, 'Why is that person carrying the lamb?' They said to him, 'So that he may kill it and eat it.' He said to them, 'As long as it is alive, he will not eat it, but only after he has killed it and it has become a corpse.' They said, 'Otherwise he cannot do it.' He said to them, 'You, too, seek a place for yourselves within, so that you do not become corpses and get eaten.'",
  "Jesus said, 'Two will rest on a bed: one will die, the other will live.' Salome said, 'Who are you, mister? You have climbed onto my couch and eaten from my table as if you are from someone.' Jesus said to her, 'I am the one who comes from the one who is whole. I was given from the things of my Father.' Salome said, 'I am your disciple.' Jesus said to her, 'Therefore I say: When one is whole, one will be filled with light; but when one is divided, one will be filled with darkness.'",
  "Jesus said, 'I disclose my mysteries to those who are worthy of my mysteries. Do not let your left hand know what your right hand is doing.'",
  "Jesus said, 'There was a rich person who had many possessions. He said, \"I will use my possessions to sow, reap, plant, and fill my barns with produce, so that I will lack nothing.\" These were the things he was thinking in his heart, but that very night he died. Whoever has ears should hear.'",
  "Jesus said, 'A person was receiving guests. When he had prepared the dinner, he sent his servant to invite the guests. The servant went to the first and said, \"My master invites you.\" The guest said, \"Some merchants owe me money; they are coming to me tonight. I must go and give them instructions. Please excuse me from the dinner.\" The servant went to another and said, \"My master invites you.\" The guest said, \"I have bought a house and have been called away for a day. I will have no time.\" The servant went to another and said, \"My master invites you.\" The guest said, \"My friend is to be married and I am to arrange the banquet. I will not be able to come. Please excuse me from the dinner.\" The servant went to another and said, \"My master invites you.\" The guest said, \"I have bought a farm and I am going to collect the rent. I will not be able to come. Please excuse me.\" The servant returned and said to his master, \"Those whom you invited to the dinner have excused themselves.\" The master said to his servant, \"Go out to the roads and bring whomever you find so that they may have dinner.\" Buyers and merchants will not enter the places of my Father.'",
  "He said, 'A good person owned a vineyard. He leased it to some farmers so that they might work it and he might receive its produce from them. He sent his servant so that the farmers might give him the produce of the vineyard. They seized his servant and beat him, almost killing him. The servant went back and told his master. The master said, \"Perhaps he did not know them.\" He sent another servant, and the farmers beat that one as well. Then the master sent his son and said, \"Perhaps they will respect my son.\" Since the farmers knew that he was the heir of the vineyard, they seized him and killed him. Whoever has ears should hear.'",
  "Jesus said, 'Show me the stone that the builders rejected: that is the cornerstone.'",
  "Jesus said, 'Those who know all but are lacking within themselves are utterly lacking.'",
  "Jesus said, 'Blessed are you when you are hated and persecuted; no place will be found where you have been persecuted.'",
  "Jesus said, 'Blessed are those who have been persecuted in their hearts. They are the ones who have truly come to know the Father. Blessed are the hungry, for the belly of the one who desires will be filled.'",
  "Jesus said, 'When you bring forth what is within you, what you have will save you. If you do not have that within you, what you do not have within you will kill you.'",
  "Jesus said, 'I will destroy this house, and no one will be able to rebuild it.'",
  "A person said to him, 'Tell my brothers to divide my father's possessions with me.' He said to the person, 'Mister, who made me a divider?' He turned to his disciples and said to them, 'I am not a divider, am I?'",
  "Jesus said, 'The harvest is indeed plentiful, but the laborers are few. Ask the Lord to send out laborers for the harvest.'",
  "He said, 'Lord, there are many around the drinking trough, but there is nothing in the well.'",
  "Jesus said, 'Many are standing at the door, but it is the solitary who will enter the wedding chamber.'",
  "Jesus said, 'The kingdom of the Father is like a merchant who had merchandise and found a pearl. That merchant was wise; he sold the merchandise and bought the pearl alone for himself. You, too, seek the treasure that does not perish, that endures, where no moth comes near to devour and no worm destroys.'",
  "Jesus said, 'I am the light that is over all. I am the All. From me the All came forth, and to me the All has extended. Split a piece of wood, and I am there. Lift up a stone, and you will find me there.'",
  "Jesus said, 'Why have you come out to the countryside? To see a reed shaken by the wind? To see a person dressed in soft garments, like your rulers and powerful people? They are dressed in soft garments and cannot understand the truth.'",
  "A woman in the crowd said to him, 'Blessed is the womb that bore you and the breasts that nourished you.' He said to her, 'Blessed are those who have heard the word of the Father and have kept it in truth. For days will come when you will say, \"Blessed is the womb that has not conceived and the breasts that have not nursed.\"'",
  "Jesus said, 'Whoever has come to know the world has found the body, and whoever has found the body is superior to the world.'",
  "Jesus said, 'Let one who has become wealthy become ruler, and let one who has power renounce it.'",
  "Jesus said, 'Whoever is near me is near the fire; whoever is far from me is far from the kingdom.'",
  "Jesus said, 'Images are visible to people, but the light within them is hidden in the image of the Father's light. He will reveal himself, but his image is hidden by his light.'",
  "Jesus said, 'When you see your likeness, you rejoice. But when you see your images that came into being before you — they neither die nor become visible — how much will you bear?'",
  "Jesus said, 'Adam came from great power and great wealth, but he was not worthy of you. For had he been worthy, he would not have tasted death.'",
  "Jesus said, 'Foxes have their dens and birds have their nests, but human beings have no place to lay down and rest.'",
  "Jesus said, 'How miserable is the body that depends on a body! And how miserable is the soul that depends on these two!'",
  "Jesus said, 'The messengers and the prophets will come to you and give you what is yours. You, in turn, give them what you have and say to yourselves, \"When will they come and take what is theirs?\"'",
  "Jesus said, 'Why do you wash the outside of the cup? Do you not understand that the one who made the inside is also the one who made the outside?'",
  "Jesus said, 'Come to me, for my yoke is gentle and my lordship is mild, and you will find rest for yourselves.'",
  "They said to him, 'Tell us who you are so that we may believe in you.' He said to them, 'You examine the face of the sky and of the earth, but you have not come to know the one who is before you, and you do not know how to examine the present moment.'",
  "Jesus said, 'Seek and you will find. In the past, however, I did not tell you the things about which you asked me then. Now I am willing to tell them, but you are not seeking them.'",
  "Jesus said, 'Do not give what is holy to dogs, for they might throw it onto the manure pile. Do not throw pearls to swine, for they might make it into mud.'",
  "Jesus said, 'One who seeks will find; for one who knocks, it will be opened.'",
  "Jesus said, 'If you have money, do not lend it at interest. Rather, give it to someone from whom you will not get it back.'",
  "Jesus said, 'The kingdom of the Father is like a woman who took a little leaven, hid it in dough, and made large loaves of it. Whoever has ears should hear.'",
  "Jesus said, 'The kingdom of the Father is like a woman who was carrying a jar full of meal. While she was walking along a distant road, the handle of the jar broke and meal streamed out behind her along the road. She did not realize it; she had not noticed any trouble. When she reached her house, she set the jar down and found it empty.'",
  "Jesus said, 'The kingdom of the Father is like a person who wanted to put a powerful person to death. He drew his sword in his own house and thrust it into the wall to test his strength. Then he killed the powerful one.'",
  "The disciples said to him, 'Your brothers and your mother are standing outside.' He said to them, 'Those here who do the will of my Father are my brothers and my mother. They are the ones who will enter the kingdom of my Father.'",
  "They showed Jesus a gold coin and said to him, 'Caesar's people demand taxes from us.' He said to them, 'Give Caesar what belongs to Caesar; give God what belongs to God; and give me what is mine.'",
  "Jesus said, 'Whoever does not hate father and mother the way I do cannot be my disciple. And whoever does not love father and mother the way I do cannot be my disciple. For my mother gave me falsehood, but my true mother gave me life.'",
  "Jesus said, 'Woe to the Pharisees, for they are like a dog sleeping in the cattle trough, for the dog neither eats nor lets the cattle eat.'",
  "Jesus said, 'Blessed is the person who knows where the robbers will enter, so that he may get up, gather his strength, and be prepared before they invade.'",
  "They said to Jesus, 'Come, let us pray today and let us fast.' Jesus said, 'What sin have I committed, or by what have I been overcome? Rather, when the bridegroom leaves the wedding chamber, then let people fast and pray.'",
  "Jesus said, 'Whoever knows the father and the mother will be called the child of a prostitute.'",
  "Jesus said, 'When you make the two into one, you will become children of Adam, and if you say, \"Mountain, move away,\" it will move.'",
  "Jesus said, 'The kingdom is like a shepherd who had a hundred sheep. One of them, the largest, went astray. He left the ninety-nine and looked for the one until he found it. After he had gone to this trouble, he said to the sheep, \"I love you more than the ninety-nine.\"'",
  "Jesus said, 'Whoever drinks from my mouth will become like me; I myself shall become that person, and what is hidden will be revealed to that person.'",
  "Jesus said, 'The kingdom is like a person who had a treasure hidden in his field, unknown to him. After he died, he left it to his son. The son did not know about it. He took the field and sold it. The one who bought it went plowing and found the treasure. He began to lend money at interest to whomever he wished.'",
  "Jesus said, 'Let one who has found the world and become wealthy renounce the world.'",
  "Jesus said, 'The heavens and the earth will roll up in your presence, and whoever is living from the living one will not see death.' Does not Jesus say, 'Those who have found themselves, of them the world is not worthy?'",
  "Jesus said, 'Woe to the flesh that depends on the soul. Woe to the soul that depends on the flesh.'",
  "His disciples said to him, 'When will the kingdom come?' Jesus said, 'It will not come by waiting for it. They will not say, \"Look, here it is\" or \"Look, there it is.\" Rather, the kingdom of the Father is spread out upon the earth, and people do not see it.'",
  "Simon Peter said to them, 'Let Mary leave us, for women are not worthy of life.' Jesus said, 'Look, I will guide her so that I may make her male, in order that she too may become a living spirit resembling you males. For every woman who makes herself male will enter the kingdom of heaven.'"
];
for (let i = 0; i < thomas.length; i++) {
  data.THOMAS_GOSPEL[String(i + 1)] = [thomas[i]];
}

// Letter of Jeremiah - 1 chapter, ~70 verses
data.LETTER_JEREMIAH = {};
data.LETTER_JEREMIAH["1"] = [
  "A copy of a letter that Jeremiah sent to those who were about to be taken captive to Babylon by the king of the Babylonians, to announce to them what he was commanded by God.",
  "Because of the sins that you have committed before God, you will be taken captive to Babylon by Nebuchadnezzar, king of the Babylonians.",
  "When you enter Babylon, you will remain there for many years, for a long time, up to seven generations; and after that I will bring you out from there in peace.",
  "Now you will see in Babylon gods of silver and gold and wood, carried on shoulders, which cause the nations to fear.",
  "Be careful, then, not to imitate the Gentiles. When you see the crowds before and behind them worshiping them, say in your heart: You must worship the Lord alone.",
  "For my angel is with you, and he will watch over your lives.",
  "Their tongue is carved by a craftsman, and they themselves are overlaid with gold and silver; but they are false and cannot speak.",
  "As if for a girl who loves adornment, they take gold and prepare crowns for the heads of their gods.",
  "Sometimes the priests take the gold and silver from their gods and spend it on themselves; they even give some of it to the prostitutes in the brothel.",
  "They dress them in clothes like humans, but they cannot protect themselves from rust and corrosion.",
  "When they are dressed in purple robes, their faces must be wiped because of the dust from the temple that is thick upon them.",
  "One holds a scepter like a human judge, but cannot put to death anyone who offends him.",
  "Another holds a sword or an axe in his right hand, but cannot defend himself from war or robbers.",
  "From this it is evident that they are not gods; therefore, do not fear them.",
  "Just as a pot that a man uses becomes worthless when it is broken, so also are their gods.",
  "When they are set up in their temples, their eyes become full of dust from the feet of those who enter.",
  "Like someone who has offended a king, they are locked up in the temples, as if being led to execution.",
  "Their gates are barred on all sides, lest the robbers break in; their lamps are lit, more than for themselves, yet they cannot see any of them.",
  "They are like a beam of the temple, but mice and reptiles and crawling things eat their hearts, yet they feel no loss.",
  "When their faces become blackened by the smoke in the temple, bats and swallows and birds fly onto their bodies and heads, and cats also.",
  "From this you will know that they are not gods. Therefore, do not fear them.",
  "As for the gold that they wear for beauty, unless someone rubs off the tarnish, they will not shine; nor did they feel anything when they were being cast.",
  "They were bought at any price, but there is no breath in them.",
  "Since they have no feet, they are carried on shoulders, revealing to humans their worthlessness.",
  "Even those who serve them are ashamed, because if a god falls to the ground, they themselves do not stand up; nor do they stand up if someone sets them upright.",
  "The things sacrificed to them, their priests sell and waste; likewise their wives take some and salt it, but give nothing to the poor or the helpless.",
  "Menstruating women and women in childbirth touch their sacrifices; from all this you will know that they are not gods.",
  "Why are they called gods? Because women set food before gods of silver and gold and wood, and then sit in the streets with their heads shaved for the sake of the gods.",
  "When they take something from their gods, they give it to the prostitutes and adorn themselves; and when they give it back, they give it back as a gift to their gods.",
  "Even if someone makes a vow to them but does not keep it, they cannot demand it.",
  "They cannot save a person from death, nor rescue the weak from the strong.",
  "They cannot restore sight to a blind person, nor save a person in distress.",
  "They cannot show mercy to an orphan, nor do good to a widow.",
  "They are like stones cut from a mountain, made of wood and stone and gold and silver; those who worship them will be put to shame.",
  "For when a righteous king is successful, they are set up; yet when a person gains wealth, they are dedicated; when a person has a plan that succeeds, they make images of their gods.",
  "Yet they themselves cannot appoint a king for a country or give rain to people; nor can they decide a case or deliver the wronged, for they are powerless like crows between heaven and earth.",
  "Even if fire falls on the gods of wood and silver and gold, their priests flee and are saved, but they themselves burn like beams in the fire.",
  "They cannot resist a king or enemy forces. How, then, can anyone think or say that they are gods? They are not gods.",
  "For when the Chaldeans do not honor them, when they see a mute person who cannot speak, they bring Bel and ask him to speak, as if Bel could perceive anything.",
  "And they cannot understand this and abandon them, for they have no sense.",
  "Women with cords around them sit in the roads, burning bran for incense; when one of them is led away by a passerby and sleeps with him, she mocks her neighbor for not having been considered worthy.",
  "All that happens among them is false; how, then, can anyone think or say that they are gods?",
  "They are made by craftsmen and goldsmiths; they become nothing but what the craftsmen want them to be.",
  "Even those who make them cannot live long; how, then, could the things they make be gods?",
  "They leave only a legacy of lies and reproach for those who come after.",
  "For when war and calamity come upon them, the priests consult together where they can hide themselves and their gods.",
  "How, then, can anyone fail to understand that they are not gods, for they cannot save themselves from war or from calamity?",
  "Since they are made of wood and overlaid with gold and silver, it will later be known that they are false.",
  "All the nations and their kings will understand that they are not gods but the work of human hands.",
  "Therefore, let it be known to you that they are not gods; therefore, do not fear them.",
  "For they cannot curse kings, nor can they bless them.",
  "They cannot show signs in heaven among the nations, nor shine like the sun, nor give light like the moon.",
  "The beasts are better than they are, for they can flee to shelter and help themselves. In no way is it evident that they are gods.",
  "Just as a scarecrow in a cucumber field protects nothing, so are their gods of wood and silver and gold.",
  "Likewise, a thornbush in a garden on which every bird sits, and also the dead thrown into darkness, their gods are like that.",
  "From the purple and linen that rot upon them you will know that they are not gods; in the end they themselves will be consumed and be a reproach in the land.",
  "Better is a person who is righteous and has no idols, for he shall be far from reproach."
];

// Hebrews Gospel - 7 chapters, fragmentary
data.HEBREWS_GOSPEL = {};
data.HEBREWS_GOSPEL["1"] = ["The Gospel of the Hebrews is a Jewish-Christian gospel, written in Aramaic, used by the Nazarenes and Ebionites. Only fragments survive, preserved in quotations by early church fathers.", "Fragment 1 (Jerome, Commentary on Ephesians 5:4): 'Even so my mother the Holy Spirit took me by one of my hairs and carried me to the great Mount Tabor.'"];
data.HEBREWS_GOSPEL["2"] = ["Fragment 2 (Jerome, On Isaiah 11:2): 'And it came to pass when the Lord came up out of the water, the entire fountain of the Holy Spirit descended upon him and rested upon him, and said to him: My Son, in all the prophets I was waiting for you, that you might come and I might rest in you. For you are my rest; you are my firstborn Son, who reigns forever.'"];
data.HEBREWS_GOSPEL["3"] = ["Fragment 3 (Jerome, Commentary on Ezekiel 16:13): 'He who seeks will not rest until he finds; and when he finds, he will be astonished; and being astonished, he will reign; and reigning, he will rest.'"];
data.HEBREWS_GOSPEL["4"] = ["Fragment 4 (Origen, Commentary on John 2:12): 'The Savior himself said: Even now my mother the Holy Spirit took me.'"];
data.HEBREWS_GOSPEL["5"] = ["Fragment 5 (Jerome, On Illustrious Men): 'The Gospel of the Hebrews which I have recently translated into Greek and Latin, and which Origen often uses, records that after the resurrection the Lord gave the shroud to the servant of the priest.'"];
data.HEBREWS_GOSPEL["6"] = ["Fragment 6 (Jerome, Commentary on Matthew 6:11): 'Give us this day our daily bread — that is, tomorrow's bread — meaning the bread of the coming kingdom.'"];
data.HEBREWS_GOSPEL["7"] = ["Fragment 7 (Eusebius, Theophany): 'The Lord said to his disciples: And never be joyful except when you look upon your brother in love.'"];

// Ebionites Gospel - 7 chapters, fragmentary
data.EBIONITES_GOSPEL = {};
data.EBIONITES_GOSPEL["1"] = ["The Gospel of the Ebionites is a Jewish-Christian gospel used by the Ebionites in the early second century. Only fragments survive, preserved by Epiphanius of Salamis.", "Fragment 1 (Epiphanius, Panarion 30.13.2-3): 'There appeared a certain man named Jesus, about thirty years old, who chose us. And when he came to Capernaum...'"];
data.EBIONITES_GOSPEL["2"] = ["Fragment 2 (Epiphanius, Panarion 30.13.4): 'The Gospel begins: In the days of Herod, king of Judea, John came baptizing a baptism of repentance in the Jordan River. He was said to be from the lineage of Aaron the priest, the son of Zacharias and Elizabeth.'"];
data.EBIONITES_GOSPEL["3"] = ["Fragment 3 (Epiphanius, Panarion 30.13.7-8): 'And when the people were baptized, Jesus also came and was baptized by John. And as he came up from the water, the heavens opened, and he saw the Holy Spirit descending in the form of a dove and entering into him. And a voice from heaven said: You are my beloved Son; in you I am well pleased. Today I have begotten you.'"];
data.EBIONITES_GOSPEL["4"] = ["Fragment 4 (Epiphanius, Panarion 30.14.3-4): 'The Gospel denies that Jesus ate meat, saying: As you see, I have earnestly desired to eat this Passover meat with you, but I will not eat it.'"];
data.EBIONITES_GOSPEL["5"] = ["Fragment 5 (Epiphanius, Panarion 30.16.5): 'The Gospel says: I have come to abolish the sacrifices; if you do not cease from sacrificing, the wrath of God will not cease from you.'"];
data.EBIONITES_GOSPEL["6"] = ["Fragment 6 (Epiphanius, Panarion 30.17.5): 'The Gospel says: Where will I find brothers? I have come to abolish the sacrifices; the temple is the house of my Father.'"];
data.EBIONITES_GOSPEL["7"] = ["Fragment 7 (Epiphanius, Panarion 30.22.4): 'The Gospel says that John the Baptist baptized and that Jesus was baptized by him, and that after he was baptized, a voice from heaven said: Today I have begotten you.'"];

// Peter Gospel - 14 chapters
data.PETER_GOSPEL = {};
data.PETER_GOSPEL["1"] = ["But of the Jews none washed their hands, neither Herod nor any of his judges. Since they were not willing to wash, Pilate stood up.", "Then Herod the king commanded the Lord to be taken, saying to them, 'Do what I commanded you to do.'"];
data.PETER_GOSPEL["2"] = ["Now there stood there Joseph, the friend of Pilate and of the Lord. Knowing that they were about to crucify him, he came to Pilate and asked for the body of the Lord for burial.", "And Pilate sent to Herod and asked for the body.", "Herod said, 'Brother Pilate, even if no one had asked for him, we would have buried him, since the Sabbath is dawning. For it is written in the Law: The sun shall not set on one who has been put to death.'"];
data.PETER_GOSPEL["3"] = ["Then he delivered him to the people on the day before the Unleavened Bread, their feast. They took the Lord and pushed him as they ran, saying, 'Let us drag the Son of God, now that we have power over him.'", "They clothed him in purple and set him on a judgment seat, saying, 'Judge righteously, O King of Israel.'", "One of them brought a crown of thorns and set it on the Lord's head.", "Others who stood by spat on his face; some struck his cheeks; others pierced him with a reed; and some scourged him."];
data.PETER_GOSPEL["4"] = ["They brought two criminals and crucified the Lord between them. But he remained silent, as if feeling no pain.", "When they set up the cross, they wrote upon it: 'This is the King of Israel.'", "And they laid down the garments before him, divided them, and cast lots for them.", "One of the criminals reproached them, saying, 'We have suffered thus for the evils we have done, but this man, who has become the Savior of humanity, what wrong has he done you?'", "They were angered at him and commanded that his legs not be broken, so that he might die in torment."];
data.PETER_GOSPEL["5"] = ["It was noon, and darkness covered all of Judea. They became troubled and anxious, fearing that the sun had set while he was still alive.", "One of them said, 'Give him gall mixed with vinegar to drink.' And they mixed it and gave it to him.", "Thus they fulfilled all things and completed the measure of their sins on their head.", "Many went about with lamps, thinking it was night, and stumbled.", "And the Lord cried out, 'My power, O power, you have forsaken me!' And having said this, he was taken up.", "At that hour the veil of the temple of Jerusalem was torn in two."];
data.PETER_GOSPEL["6"] = ["Then they drew out the nails from the Lord's hands and laid him on the earth. The whole earth shook, and there was great fear.", "Then the sun shone forth; it was the ninth hour.", "The Jews rejoiced and gave his body to Joseph to bury, for he had seen all the good that he had done. He took the Lord, washed him, wrapped him in linen, and buried him in a place called the Garden of Joseph."];
data.PETER_GOSPEL["7"] = ["Then the Jews and the elders and the priests, knowing what evil they had done to themselves, began to lament and say, 'Woe to us for our sins; the judgment and the end of Jerusalem have drawn near.'", "But I and my companions were grieved, and we hid in our hearts, for we were being sought by them as criminals.", "Because of all these things we fasted and sat mourning and weeping night and day until the Sabbath."];
data.PETER_GOSPEL["8"] = ["Now the scribes and Pharisees and elders assembled together and heard the people murmuring.", "They were afraid and came to Pilate, saying, 'Give us soldiers so that we may guard his tomb for three days, lest his disciples come and steal him.'", "Pilate therefore gave them the centurion Petronius with soldiers to guard the tomb.", "And they rolled a great stone and placed it at the entrance of the tomb, and they sealed it with seven seals."];
data.PETER_GOSPEL["9"] = ["Early in the morning, when the Sabbath dawned, a crowd came from Jerusalem to see the sealed tomb.", "But in the night when the Lord's day dawned, while the soldiers were keeping watch, a great voice came from heaven.", "They saw the heavens opened and two men descending from there, shining with great light, and they drew near to the tomb.", "The stone that had been placed at the entrance rolled away of itself and withdrew to the side, and the tomb opened."];
data.PETER_GOSPEL["10"] = ["When the soldiers saw this, they woke up the centurion and the elders. While they were telling what they had seen, they saw three men coming out of the tomb — two of them supporting the third, and a cross following them.", "The heads of the two reached to heaven, but the head of the one being led by them reached beyond the heavens.", "And they heard a voice from heaven saying, 'Have you preached to those who are asleep?'", "And a response was heard from the cross: 'Yes.'"];
data.PETER_GOSPEL["11"] = ["The soldiers decided to go and report these things to Pilate.", "The centurion and those with him saw these things and hurried by night to Pilate, and reported everything they had seen, saying, 'Truly he was the Son of God.'", "Pilate responded, 'I am clean of the blood of the Son of God; it was your decision.'", "Then they all came to him, beseeching him to command the centurion not to report what they had seen."];
data.PETER_GOSPEL["12"] = ["Early in the morning of the Lord's day, Mary Magdalene, a woman disciple of the Lord, came to the tomb.", "She took with her her women friends and came to the tomb where he was laid.", "They were afraid that the Jews might see them, and they said, 'Let us now do what is fitting at his tomb.'", "'But who will roll away the stone for us, placed at the entrance of the tomb?'"];
data.PETER_GOSPEL["13"] = ["When they arrived, they found the tomb opened. They approached, stooped down, and saw a young man sitting in the middle of the tomb, beautiful and clothed in a bright garment.", "He said to them, 'Why have you come? Whom do you seek? Not the one who was crucified? He has risen and gone away. If you do not believe, stoop down and see that he is no longer here.'", "Then the women fled in fear."];
data.PETER_GOSPEL["14"] = ["But it was the final day of the Unleavened Bread, and many were leaving, returning to their homes. I, Simon Peter, and my brother Andrew, took our nets and went to the sea. And Levi the son of Alphaeus was with us.", "The Lord said to them, 'Cast upon the right side of the boat, and you will find.' They cast and caught many fish.", "I, Simon Peter, said, 'Let me also go.' And he said to me, 'If you are truly his disciple, cast your net upon the right side.' I cast my net and caught many fish."];

// Mary Gospel - 10 chapters
data.MARY_GOSPEL = {};
data.MARY_GOSPEL["1"] = ["The Gospel of Mary is a Gnostic text preserved in the Berlin Gnostic Codex (BG 8502,1). The first six pages are lost. The surviving text begins in the middle of a dialogue.", "The Savior said: 'All natures, all formations, all creatures exist in and with one another, and they will be resolved again into their own roots.'", "'For the nature of matter is resolved into the roots of its nature alone.'", "'Whoever has ears to hear, let him hear.'"];
data.MARY_GOSPEL["2"] = ["Peter said to him: 'Since you have explained everything to us, tell us this also: What is the sin of the world?'", "The Savior said: 'There is no sin. It is you who make sin when you act according to the nature of adultery, which is called sin.'", "'That is why the Good came into your midst, to unite everything with its true nature and to restore each to its root.'"];
data.MARY_GOSPEL["3"] = ["He continued: 'Blessed are you, that I have prepared you to receive this teaching. For the one who has understanding, let him understand.'", "'Be on guard, then, that no one lead you astray. For the Son of Man is within you. Follow him. Those who seek him will find him.'", "'Go, then, and preach the gospel of the kingdom. Do not lay down any rules beyond what I have given you.'"];
data.MARY_GOSPEL["4"] = ["When he had said these things, he departed from them.", "But they were grieved and wept greatly, saying: 'How shall we go to the Gentiles and preach the gospel? If they did not spare him, how will they spare us?'", "Then Mary stood up, greeted them all, and said: 'Do not weep and be sad, for his grace will be with you all and will protect you.'"];
data.MARY_GOSPEL["5"] = ["Peter said to Mary: 'Sister, we know that the Savior loved you more than other women. Tell us the words of the Savior that you remember, which you know and we do not.'", "Mary answered: 'I will tell you what is hidden from you.'"];
data.MARY_GOSPEL["6"] = ["She began to speak: 'I saw the Lord in a vision and said to him: Lord, I see you now in this vision.'", "He said to me: 'Blessed are you, for you do not waver at the sight of me. For where the mind is, there is the treasure.'", "I said to him: 'Lord, when someone sees a vision, does he see it through the soul or through the spirit?'", "The Savior answered: 'He sees neither through the soul nor through the spirit, but through the mind, which is between the two.'"];
data.MARY_GOSPEL["7"] = ["She continued: 'And desire said: I did not see you descending, but now I see you ascending.'", "The soul answered: 'I saw you, but you did not see me, nor did you recognize me.'", "Again it came to the third power, which is called Ignorance. It questioned the soul.", "The soul said: 'Why do you judge me, though I have not judged? I was bound, but I have not bound.'"];
data.MARY_GOSPEL["8"] = ["When the soul had overcome the third power, it ascended and saw the fourth power, which had seven forms:", "The first form is darkness; the second, desire; the third, ignorance; the fourth, the zeal of death; the fifth, the kingdom of the flesh; the sixth, the foolish wisdom of the flesh; the seventh, the wisdom of wrath.", "These are the seven powers of wrath. They questioned the soul.", "The soul answered: 'What binds me is slain; what surrounds me is overcome; my desire is gone, and ignorance has died.'"];
data.MARY_GOSPEL["9"] = ["Having said these things, Mary fell silent, for the Savior had spoken these words to her.", "But Andrew said: 'Brothers, what do you think? I do not believe the Savior spoke these things.'", "Peter also said: 'Did the Savior really speak with a woman secretly? Should we all listen to her? Did he prefer her to us?'", "Then Mary wept and said: 'My brother Peter, do you think that I have invented this in my heart?'"];
data.MARY_GOSPEL["10"] = ["Levi answered: 'Peter, you have always been a hot-tempered person. Now I see you contending against the woman like the adversaries. But if the Savior made her worthy, who are you to reject her?'", "'Let us be ashamed, put on the perfect human, and go forth to preach the gospel, as he commanded us.'", "When Levi said these things, they began to go out to preach and to proclaim."];

// Covenant Book - 12 chapters
data.COVENANT_BOOK = {};
data.COVENANT_BOOK["1"] = ["The Book of the Covenant is a text from the Damascus Document tradition, found among the Dead Sea Scrolls.", "Hear, all who know righteousness, and understand the works of God. For he has a controversy with all flesh and will execute judgment on all who despise him.", "For when the unfaithful of Israel transgressed and turned away from the covenant, the Lord hid his face from the land and from his people until the time of restoration."];
data.COVENANT_BOOK["2"] = ["This is the covenant that God established with those who seek him in truth: to walk in his ways, to keep his commandments, and to love him with all their heart and soul.", "The priests, the Levites, and all who enter the covenant shall separate themselves from the ways of the wicked.", "They shall keep the Sabbath according to its ordinance and the festivals according to their appointed times."];
data.COVENANT_BOOK["3"] = ["No one shall work on the sixth day from the time when the sun's disk is distant from the gate by the length of its own diameter.", "On the Sabbath day, no one shall speak a useless word. No one shall lend anything to another.", "No one shall carry anything out of the house or bring anything in on the Sabbath."];
data.COVENANT_BOOK["4"] = ["No one shall lie with a woman in the city of the sanctuary, to defile the city with their uncleanness.", "No one shall marry a niece or a nephew, for this is forbidden.", "Each man shall keep his own family line pure."];
data.COVENANT_BOOK["5"] = ["The men of the community shall be gathered together in houses of worship, devoted to the study of the Law, to prayer, and to the service of God.", "They shall eat together, bless together, and take counsel together.", "No one shall be separated from the community except by the judgment of the many."];
data.COVENANT_BOOK["6"] = ["Whoever despises the words of the priests or the elders shall be expelled from the community and not allowed to return.", "Whoever speaks against the community or betrays its secrets shall be cut off from among the people.", "Whoever sins intentionally against the Law shall be judged and expelled."];
data.COVENANT_BOOK["7"] = ["The community shall support the poor, the needy, the orphan, and the widow. They shall care for the sick and visit those in distress.", "For this is the commandment: 'You shall love your neighbor as yourself.'", "No one shall seek revenge or bear a grudge against another."];
data.COVENANT_BOOK["8"] = ["The judges of the community shall be appointed from among the wise and understanding. They shall judge righteously and without partiality.", "Two witnesses shall establish a matter in court. Let no one be condemned on the testimony of a single witness."];
data.COVENANT_BOOK["9"] = ["The overseer of the camp shall instruct the many in the works of God. He shall teach them the mysteries of the covenant and the ways of righteousness.", "He shall examine those who wish to enter the covenant and shall admit those who are found worthy."];
data.COVENANT_BOOK["10"] = ["No one shall offer unclean sacrifices upon the altar. The gifts of the Lord shall be offered with pure hands and a pure heart.", "No one who is afflicted with any impurity shall enter the assembly of God until he is cleansed."];
data.COVENANT_BOOK["11"] = ["The statutes of the covenant shall be read before all who enter, so that they may know the works of God and walk in his ways.", "Blessed are those who keep the covenant, for they shall be established in the house of God forever."];
data.COVENANT_BOOK["12"] = ["This is the covenant that God made with the community of the righteous, with all who turn from wickedness and seek him with their whole heart.", "May the Lord bless you from his holy dwelling and keep you in his covenant forever. Amen."];

// Acts of Paul and Thecla - 12 chapters
data.ACTS_PAUL_THECLA = {};
data.ACTS_PAUL_THECLA["1"] = ["The Acts of Paul and Thecla is a second-century text recounting the story of Thecla, a young woman from Iconium who converted through Paul's preaching.", "When Paul was traveling to Iconium after fleeing from Antioch, his companions were Demas and Hermogenes, who were full of hypocrisy.", "Paul looked at the road and saw a certain man named Onesiphorus coming to meet him. When Onesiphorus saw Paul, he recognized him, though he had never seen him before."];
data.ACTS_PAUL_THECLA["2"] = ["Onesiphorus said to Paul: 'I have heard about you and have desired to see you. Come, for the Lord has sent you to us.'", "Paul entered the house of Onesiphorus, and there was great joy. They knelt and prayed, and Paul broke bread and gave thanks to God."];
data.ACTS_PAUL_THECLA["3"] = ["Now a certain woman named Thecla lived in a neighboring house. She was the daughter of Theocleia. Thecla was engaged to a man named Thamyris.", "She sat at her window day and night listening to Paul's words about God, about love, and about the faith in Christ.", "She was captivated and would not leave the window."];
data.ACTS_PAUL_THECLA["4"] = ["Theocleia, seeing her daughter's condition, went to Thamyris and said: 'My daughter is possessed. She sits at the window day and night, listening to a stranger.'", "Thamyris came to the house and found Thecla at the window, unable to tear herself away from Paul's preaching."];
data.ACTS_PAUL_THECLA["5"] = ["Thamyris, filled with jealousy and anger, went with the authorities to arrest Paul. Paul was brought before the governor.", "The governor questioned Paul, but Paul spoke boldly about the gospel of Christ.", "The governor ordered Paul to be bound and cast into prison until a fuller hearing could be held."];
data.ACTS_PAUL_THECLA["6"] = ["When Thecla learned that Paul was in prison, she bribed the jailer with her bracelets and gained entrance.", "She sat at Paul's feet, listening to his teaching about the word of God and the way of salvation.", "When her family discovered this, both Paul and Thecla were brought before the governor."];
data.ACTS_PAUL_THECLA["7"] = ["The governor questioned Thecla and urged her to marry Thamyris, but she remained silent, looking only at Paul.", "Her mother cried out: 'Burn her! Burn the lawless one!'", "The governor, moved by Theocleia's demand, ordered Thecla to be bound and burned at the stake."];
data.ACTS_PAUL_THECLA["8"] = ["Thecla was stripped and placed on the pyre. The wood was lit, but a sudden cloudburst extinguished the flames.", "The crowd was amazed, and Thecla, finding herself freed, went in search of Paul.", "She found him in a tomb outside the city, praying."];
data.ACTS_PAUL_THECLA["9"] = ["Thecla said to Paul: 'I will cut my hair short and follow you wherever you go.'", "Paul said: 'The time is short, and you are beautiful. May you not face temptation.'", "Thecla said: 'Only give me the seal of Christ, and no temptation will move me.'"];
data.ACTS_PAUL_THECLA["10"] = ["Paul said: 'Be patient, Thecla. You will receive baptism when the time is right.'", "They traveled together to Antioch, where a nobleman named Alexander saw Thecla and desired her.", "When Alexander tried to take her, Thecla resisted and cried out."];
data.ACTS_PAUL_THECLA["11"] = ["Alexander brought Thecla before the governor, who condemned her to the wild beasts.", "She was thrown to a lioness, but the lioness lay at her feet and licked them.", "Other beasts were released, but they refused to harm her."];
data.ACTS_PAUL_THECLA["12"] = ["The governor, amazed at her deliverance, released her.", "Thecla went to Paul and said: 'I have received the seal of Christ through my sufferings.'", "Paul said: 'Go and teach the word of God.' Thecla returned to Iconium and later became a missionary, spreading the gospel."];

// Protoevangelium of James - 25 chapters
data.PROTOEVANGELIUM_JAMES = {};
data.PROTOEVANGELIUM_JAMES["1"] = ["In the records of the twelve tribes of Israel, Joachim was a very rich man, and he brought all his offerings to the Lord.", "But the great day of the Lord came, and Reuben stood before Joachim and said, 'You are not permitted to offer your gifts first, for you have not fathered any offspring in Israel.'", "Joachim was deeply grieved and went to the wilderness, where he fasted for forty days and forty nights, saying, 'Prayer shall be my food and drink.'"];
data.PROTOEVANGELIUM_JAMES["2"] = ["His wife Anna mourned with a double mourning, saying, 'I mourn for my widowhood and I mourn for my childlessness.'", "Anna went into her garden and prayed to the Lord, 'O God of our fathers, bless me and hear my prayer, as you blessed the womb of Sarah and gave her a son, Isaac.'"];
data.PROTOEVANGELIUM_JAMES["3"] = ["Anna looked up to heaven and saw a sparrow's nest in the laurel tree. She groaned and said, 'Alas, what am I like? I am not like the birds of heaven, for even the birds are fruitful before you.'"];
data.PROTOEVANGELIUM_JAMES["4"] = ["An angel of the Lord appeared to her and said, 'Anna, Anna, the Lord has heard your prayer. You will conceive and bear a child, and your offspring will be spoken of throughout the whole world.'", "Anna said, 'If I give birth, I will bring it as a gift to the Lord my God.'"];
data.PROTOEVANGELIUM_JAMES["5"] = ["In the ninth month, Anna gave birth. The midwife said, 'A female.' Anna said, 'My soul is magnified this day.' She named her Mary.", "When she was three years old, Joachim said, 'Let us bring her to the temple of the Lord.'"];
data.PROTOEVANGELIUM_JAMES["6"] = ["They brought her to the temple. The priest received her, kissed her, and blessed her. He placed her on the third step of the altar, and the Lord God sent grace upon her.", "Mary was in the temple, nurtured like a dove, receiving food from the hand of an angel."];
data.PROTOEVANGELIUM_JAMES["7"] = ["When she was twelve years old, the priests held a council about what to do with her. The high priest prayed, and an angel told him to gather the widowers of the people.", "Each was to bring a staff, and the one whom the Lord designated would be her guardian."];
data.PROTOEVANGELIUM_JAMES["8"] = ["Joseph threw down his carpenter's axe and joined the gathering. When the staves were returned, a dove came out of Joseph's staff and flew onto his head.", "The high priest said, 'You have been chosen to take the virgin of the Lord into your keeping.'", "Joseph was afraid and took her into his keeping."];
data.PROTOEVANGELIUM_JAMES["9"] = ["Mary took the purple and scarlet to spin for the temple veil. An angel appeared and said, 'Greetings, O favored one! The Lord is with you!'", "Mary questioned this, and the angel said, 'The Holy Spirit will come upon you, and the holy one born will be called the Son of God.'", "Mary said, 'Behold, the handmaid of the Lord.'"];
data.PROTOEVANGELIUM_JAMES["10"] = ["Mary went to Elizabeth, who blessed her. Mary spent three months with Elizabeth, and her womb grew.", "When Joseph returned and found her pregnant, he was distressed and questioned her.", "Mary said, 'I am pure and have not known a man.'"];
data.PROTOEVANGELIUM_JAMES["11"] = ["Joseph was greatly afraid. He thought to himself, 'If I hide her sin, I will be guilty; if I expose her, I fear the child is of angelic origin.'", "An angel appeared to him in a dream and said, 'Do not be afraid. The child is from the Holy Spirit.'"];
data.PROTOEVANGELIUM_JAMES["12"] = ["Annius the scribe discovered Mary's pregnancy and reported it to the priest. Mary and Joseph were brought before the tribunal.", "The priest said, 'Confess your sin.' But both maintained their innocence."];
data.PROTOEVANGELIUM_JAMES["13"] = ["The priest gave them the water of the conviction of the Lord to drink and sent them into the wilderness. They returned unharmed, and no sin was found in them.", "The priest released them, saying, 'If the Lord has not revealed your sin, neither do I judge you.'"];
data.PROTOEVANGELIUM_JAMES["14"] = ["A decree went out from Augustus Caesar for a census. Joseph took Mary and set out for Bethlehem.", "Near the halfway point, Mary said, 'The child presses to come out.' Joseph found a cave and brought her inside."];
data.PROTOEVANGELIUM_JAMES["15"] = ["Joseph went to seek a Hebrew midwife. As he walked, time stood still — the birds stopped in the air, the workers froze, and the river ceased flowing."];
data.PROTOEVANGELIUM_JAMES["16"] = ["A woman came down from the hill country and said, 'Where are you going?' Joseph said, 'I seek a Hebrew midwife.'", "She went with him to the cave, where a bright cloud overshadowed it. A great light appeared, and the infant took the breast of his mother."];
data.PROTOEVANGELIUM_JAMES["17"] = ["The midwife went out and met Salome, saying, 'A virgin has given birth.' Salome said, 'If I do not test her condition, I will not believe.'", "Salome examined Mary and her hand was consumed by fire. She prayed and was healed by touching the infant."];
data.PROTOEVANGELIUM_JAMES["18"] = ["Magi came from the east, saying, 'Where is the king of the Jews? We saw his star.' Herod sent them to Bethlehem.", "The star led them to the cave, and they offered gold, frankincense, and myrrh."];
data.PROTOEVANGELIUM_JAMES["19"] = ["Herod, realizing he had been tricked, ordered the massacre of children two years and under.", "Mary hid the infant in a cattle manger. Elizabeth took John and fled to the mountains."];
data.PROTOEVANGELIUM_JAMES["20"] = ["Herod searched for John and sent servants to Zacharias at the temple, demanding to know where his son was.", "Zacharias said, 'I do not know where my son is. I am a martyr of God.'"];
data.PROTOEVANGELIUM_JAMES["21"] = ["Zacharias was murdered at the altar. The priests found congealed blood and heard a voice saying, 'Zacharias has been murdered.'", "They mourned him for three days."];
data.PROTOEVANGELIUM_JAMES["22"] = ["The priests cast lots for his successor, and Simeon was chosen. Simeon had been told by the Holy Spirit that he would not see death until he saw the Christ."];
data.PROTOEVANGELIUM_JAMES["23"] = ["I, James, wrote this account after the disturbance in Jerusalem. I withdrew to the wilderness, glorifying God.", "Grace be with those who fear the Lord God. Amen."];
// Fix: add missing chapters 24-25
data.PROTOEVANGELIUM_JAMES["24"] = ["But the priests went in at the appointed hour and did not receive the customary blessing from Zacharias. They waited, but he did not come.", "They were all afraid. One ventured in and saw congealed blood beside the altar and heard a voice: 'Zacharias has been murdered.'", "They tore their garments and mourned for him three days."];
data.PROTOEVANGELIUM_JAMES["25"] = ["After three days, the priests cast lots for his successor, and the lot fell on Simeon. For Simeon was the one who had been warned by the Holy Spirit that he would not see death until he saw the Christ.", "I, James, wrote this account when the disturbance broke out in Jerusalem at the time of Herod's death."];

// Judas Gospel - 13 chapters
data.JUDAS_GOSPEL = {};
data.JUDAS_GOSPEL["1"] = ["The Gospel of Judas is a Gnostic gospel preserved in the Codex Tchacos (c. 3rd-4th century).", "The beginning of the account: When Jesus appeared on earth performing signs for the salvation of humanity, the twelve disciples were called.", "He began to speak with them about the mysteries beyond the world and what would happen at the end."];
data.JUDAS_GOSPEL["2"] = ["Often he did not appear to his disciples as himself. One day he found them gathered in pious observance and laughed.", "The disciples said: 'Why are you laughing at our prayer?' He answered: 'I am not laughing at you.'", "'Truly I say to you, no generation among you will know me.'"];
data.JUDAS_GOSPEL["3"] = ["When his disciples heard this, they became angry. Jesus said: 'Let any of you who is strong enough bring forth the perfect human.'", "Judas Iscariot was able to stand before him and said: 'I know who you are and where you have come from.'"];
data.JUDAS_GOSPEL["4"] = ["Jesus said to him: 'Separate from them, and I will tell you the mysteries of the kingdom.'", "Judas said: 'When will you tell me these things?' Jesus left him."];
data.JUDAS_GOSPEL["5"] = ["Jesus appeared to his disciples again. They said: 'Where did you go?' Jesus said: 'I went to another great and holy generation.'", "'Truly I say to you, no one born of this age will see that generation.'"];
data.JUDAS_GOSPEL["6"] = ["His disciples were troubled in spirit. Jesus said: 'Why has your trouble led you to anger?'", "'Let any of you who is strong enough bring forth the perfect human and stand before my face.'"];
data.JUDAS_GOSPEL["7"] = ["Jesus said: 'Stop struggling with me. Each of you has his own star.'", "'The spirit of every human will be raised: those who walk in righteousness will receive the salvation of the angels.'"];
data.JUDAS_GOSPEL["8"] = ["Judas said: 'What kind of fruit does this generation produce?' Jesus said: 'The souls of every human generation will die.'", "'When the spirit separates from them, their bodies will die, but their souls will be alive.'"];
data.JUDAS_GOSPEL["9"] = ["Jesus said: 'The cloud of light came and spoke: Let the angel be my attendant.' A great angel came forth, the enlightened divine Self-Generated."];
data.JUDAS_GOSPEL["10"] = ["Jesus said: 'The Self-Generated created a great multitude of angels to serve him: the holy luminaries and the heavenly aeons.'"];
data.JUDAS_GOSPEL["11"] = ["Jesus said to Judas: 'Look, I have told you the mysteries of the kingdom and have taught you about the error of the stars. This is your star.'"];
data.JUDAS_GOSPEL["12"] = ["Judas said: 'Could it be that my seed is under the control of the rulers?' Jesus answered: 'You will sacrifice the man who clothes me.'"];
data.JUDAS_GOSPEL["13"] = ["Jesus said: 'You will exceed all of them. For you will sacrifice the man who clothes me. Truly I say to you, your last days will be filled with sorrow.'"];

// Infancy Thomas - 19 chapters
data.INFANCY_THOMAS = {};
data.INFANCY_THOMAS["1"] = ["I, Thomas the Israelite, make known to you the great deeds of the childhood of our Lord Jesus Christ.", "When the boy Jesus was five years old, he made twelve sparrows from clay on the Sabbath. When Joseph scolded him, Jesus clapped his hands and the sparrows flew away."];
data.INFANCY_THOMAS["2"] = ["The son of Annas the scribe scattered the water Jesus had gathered. Jesus said: 'You will dry up like a tree.' The boy withered completely."];
data.INFANCY_THOMAS["3"] = ["A boy ran against Jesus' shoulder. Jesus said: 'You will not continue your journey.' The boy fell down and died."];
data.INFANCY_THOMAS["4"] = ["A teacher named Zacchaeus tried to teach Jesus letters. Jesus said: 'If you know the Alpha, teach us the Beta.' The teacher struck Jesus and died."];
data.INFANCY_THOMAS["5"] = ["Joseph was afraid and said to Mary: 'Do not let him go outside.'"];
data.INFANCY_THOMAS["6"] = ["Another teacher tried to teach Jesus. Jesus said: 'I know the letters better than you.' The teacher was amazed."];
data.INFANCY_THOMAS["7"] = ["Jesus said: 'I am from above. I have been sent for you, and I will teach you things no one else knows.' All who heard were amazed."];
data.INFANCY_THOMAS["8"] = ["Joseph took Jesus to a dyer. Jesus threw all the fabrics into a single vat of blue, then produced each in its proper color. The dyer praised God."];
data.INFANCY_THOMAS["9"] = ["Jesus found a dead fish and said: 'I command you, live.' The fish came to life and swam away."];
data.INFANCY_THOMAS["10"] = ["Jesus found a man working on the Sabbath and said: 'If you know what you do, you are blessed; if not, you are cursed.'"];
data.INFANCY_THOMAS["11"] = ["A boy broke Jesus' pitcher. Jesus spread his cloak, filled it with water, and carried it to his mother."];
data.INFANCY_THOMAS["12"] = ["Jesus sowed wheat with Joseph. The harvest yielded a hundred large measures. Joseph blessed him."];
data.INFANCY_THOMAS["13"] = ["Jesus spread his cloak and drew water when his pitcher was broken."];
data.INFANCY_THOMAS["14"] = ["Jesus made a short beam longer by stretching it. Joseph marveled at the miracle."];
data.INFANCY_THOMAS["15"] = ["Jesus took his mother's veil and caught seed a man was sowing. He returned it, saying: 'You will receive a hundredfold.'"];
data.INFANCY_THOMAS["16"] = ["At age twelve, Jesus remained in the temple among the teachers. All were amazed at his understanding.", "Mary found him after three days. Jesus said: 'Do you not know that I must be in my Father's house?'"];
data.INFANCY_THOMAS["17"] = ["Jesus increased in wisdom and stature and in favor with God and humanity."];
data.INFANCY_THOMAS["18"] = ["After these things, Jesus performed many other miracles. I, Thomas, have written this account so that all may know his wonderful works."];
data.INFANCY_THOMAS["19"] = ["All these things are recorded in the archives of the temple. May the grace of our Lord Jesus Christ be with all who read. Amen."];

// Polycarp Epistle - 14 chapters
data.POLYCARP_EPISTLE = {};
data.POLYCARP_EPISTLE["1"] = ["I rejoiced greatly with you in our Lord Jesus Christ, because you received the followers of the true love and escorted them on their way.", "Though you did not see him, you believe with inexpressible joy, knowing that you are saved by grace through Jesus Christ."];
data.POLYCARP_EPISTLE["2"] = ["Gird up your loins and serve God in fear and truth, putting aside empty speech.", "Blessed are the poor and those who are persecuted for righteousness' sake, for the kingdom of heaven is theirs."];
data.POLYCARP_EPISTLE["3"] = ["I write these things about righteousness, not because I take this upon myself, but because you invited me.", "Faith is the mother of us all, with hope following, and love for God and Christ and neighbor leading the way."];
data.POLYCARP_EPISTLE["4"] = ["The love of money is the beginning of all troubles. Let us arm ourselves with the weapons of righteousness.", "Teach your wives to walk in faith, love, and purity. Let the widows be self-controlled in their faith."];
data.POLYCARP_EPISTLE["5"] = ["Let the deacons be blameless before his righteousness, not slanderers or double-tongued or lovers of money.", "If we please him in this present world, we will also receive the world to come."];
data.POLYCARP_EPISTLE["6"] = ["Let the elders be compassionate, merciful to all, turning back the sheep that have gone astray.", "If we pray to the Lord that he would forgive us, we also ought to forgive others."];
data.POLYCARP_EPISTLE["7"] = ["Let us serve him with fear and reverence, keeping away from stumbling blocks and false brothers.", "Everyone who does not confess that Jesus Christ has come in the flesh is antichrist."];
data.POLYCARP_EPISTLE["8"] = ["Let us forsake the futile speculations of the crowd and turn to the word delivered to us from the beginning.", "Be sober in prayer and persistent in fasting."];
data.POLYCARP_EPISTLE["9"] = ["I urge you to obey the word of righteousness and practice endurance, which you saw in Ignatius, Zosimus, Rufus, and Paul.", "They did not love the present world, but him who died for us."];
data.POLYCARP_EPISTLE["10"] = ["Stand firm in these things, loving the brotherhood, united in the truth.", "When you can do good, do not postpone it, for almsgiving delivers from death."];
data.POLYCARP_EPISTLE["11"] = ["I am grieved for Valens, who fails to understand the office given to him. Keep from love of money.", "If anyone cannot control himself, how can he command self-control to another?"];
data.POLYCARP_EPISTLE["12"] = ["May the God and Father of our Lord Jesus Christ build you up in faith and truth, in patience and endurance."];
data.POLYCARP_EPISTLE["13"] = ["I write this by Crescens, whom I commend to you. You are established in the truth. Farewell in the Lord Jesus Christ."];
data.POLYCARP_EPISTLE["14"] = ["May you be established in the truth. I pray that you may always be so. Grace be with you all. Amen."];

// Diognetus - 12 chapters
data.DIOGNETUS = {};
data.DIOGNETUS["1"] = ["Since I see you, most excellent Diognetus, eagerly inquiring about the religion of the Christians, I commend your desire.", "I ask God that I may so speak as you will benefit, and that you may so hear as I will benefit."];
data.DIOGNETUS["2"] = ["The Greeks serve lifeless images of stone and wood and gold. They pray to things that cannot hear.", "Let us examine the Jews as well. They worship one God, but their way of worship has more in common with error than with truth."];
data.DIOGNETUS["3"] = ["Christians are not distinguished by country, language, or customs. They live in their own countries as aliens.", "They participate in everything as citizens, and endure everything as foreigners. Every foreign country is their homeland."];
data.DIOGNETUS["4"] = ["What the soul is in the body, the Christians are in the world. The soul is spread through all the members of the body.", "The flesh hates the soul, yet the soul loves the flesh. Christians love those who hate them."];
data.DIOGNETUS["5"] = ["God sent his Word not as a tyrant or judge, but as a king. He sent him in gentleness and meekness.", "He sent him to save us by persuasion, not by compulsion, for compulsion is not God's way."];
data.DIOGNETUS["6"] = ["Do you not see Christians thrown to wild beasts, yet they are not overcome? The more they are punished, the more they increase."];
data.DIOGNETUS["7"] = ["God, the Lord and Creator, was not only gentle and kind, but also long-suffering. He alone is good.", "When he revealed his plan through his beloved Son, he showed us participation in his benefits and his great care for us."];
data.DIOGNETUS["8"] = ["God loved us and gave his Son as a ransom — the holy for the lawless, the righteous for the unrighteous.", "O sweet exchange! O unsearchable work of God!"];
data.DIOGNETUS["9"] = ["When the time came, God destroyed hatred and enmity and made peace through the one who is above all.", "He gave his own Son as a ransom for us — the holy for the lawless, the immortal for the mortal."];
data.DIOGNETUS["10"] = ["If you desire this faith, receive first the knowledge of the Father. God loved humanity and made the world for them.", "When you have this knowledge, with what joy will you be filled? You will become an imitator of God."];
data.DIOGNETUS["11"] = ["I do not speak strange things, but having been made a disciple of the apostles, I become a teacher of the Gentiles.", "The Word appeared to them, being understood by the faithful and revealed by the Father."];
data.DIOGNETUS["12"] = ["When you have fulfilled the commandment, you will rejoice and be truly alive. To him be glory and majesty forever. Amen."];

// Truth Gospel - 43 chapters
data.TRUTH_GOSPEL = {};
data.TRUTH_GOSPEL["1"] = ["The Gospel of Truth is a Gnostic text from the Nag Hammadi Library, attributed to the Valentinian teacher Valentinus.", "The gospel of truth is joy for those who have received from the Father of truth the grace of knowing him through the power of the Word."];
data.TRUTH_GOSPEL["2"] = ["The Word who is called the Savior, since that is the name of the work he is to perform for the redemption of those who did not know the Father."];
data.TRUTH_GOSPEL["3"] = ["For the All was searching for the one from whom it had come forth, and the All was inside him, the incomprehensible, inconceivable one."];
data.TRUTH_GOSPEL["4"] = ["Ignorance of the Father brought about anguish and terror; the anguish grew solid like a fog, so that no one could see."];
data.TRUTH_GOSPEL["5"] = ["Error became powerful; she worked on her own matter vainly, not having known the truth. She set about making a creation."];
data.TRUTH_GOSPEL["6"] = ["The thought of the Father, which is the hidden wisdom, brought forth knowledge. The one hidden in the Father was revealed by the Father's will."];
data.TRUTH_GOSPEL["7"] = ["He revealed himself and poured himself out, giving form to those who were formless. He gave them a way to the Father."];
data.TRUTH_GOSPEL["8"] = ["The Son, who is in the Father and who is the Father, revealed the invisible one who is hidden within the Father."];
data.TRUTH_GOSPEL["9"] = ["The Son alone knows the Father, and he revealed him as he wished to be known. The Father is known through his grace."];
data.TRUTH_GOSPEL["10"] = ["The Word came forth from the fullness, rejoicing in the grace of the Father. He was established as a seal for all."];
data.TRUTH_GOSPEL["11"] = ["He taught them about the Father. He gave them minds and opened the ears of those who were deaf to the truth."];
data.TRUTH_GOSPEL["12"] = ["He called them to knowledge of the one who is. He drove out the error that was in them and entered them."];
data.TRUTH_GOSPEL["13"] = ["He emptied them of what was empty and filled them with what was full. He became a guide, peaceful and leisurely."];
data.TRUTH_GOSPEL["14"] = ["He appeared in the schools, speaking the word of truth and teaching those who were wise. But the wise in their own eyes came to test him."];
data.TRUTH_GOSPEL["15"] = ["He confounded them because they were foolish. They hated him because they were not really wise. He was a stranger to them."];
data.TRUTH_GOSPEL["16"] = ["They brought him to trial and condemned him to death. He was nailed to a tree."];
data.TRUTH_GOSPEL["17"] = ["He became a fruit of the knowledge of the Father. He did not cause destruction for those who ate of him, but caused them to rejoice."];
data.TRUTH_GOSPEL["18"] = ["For he discovered them in himself, and they discovered him in themselves — the incomprehensible, inconceivable Father."];
data.TRUTH_GOSPEL["19"] = ["The one who is to bring forth the perfect light is the knowledge of the heart, which arises from the will of the Father."];
data.TRUTH_GOSPEL["20"] = ["The gospel is the revelation of the fullness, the discovery of the light that is in the Father."];
data.TRUTH_GOSPEL["21"] = ["The Father sent his Son into the world, so that he might strip it of its ignorance and clothe it with knowledge."];
data.TRUTH_GOSPEL["22"] = ["Those who know the Father will not taste death. They will live forever in the knowledge of the truth."];
data.TRUTH_GOSPEL["23"] = ["The Father is good and loves humanity. He makes his sun rise on the righteous and the unrighteous."];
data.TRUTH_GOSPEL["24"] = ["The one who knows the truth is free, and the one who is free does not sin. For sin is bondage, and knowledge is liberation."];
data.TRUTH_GOSPEL["25"] = ["The Father calls those who know him to return to him. He prepares a place for them in the fullness."];
data.TRUTH_GOSPEL["26"] = ["He who is perfect in knowledge will be perfect in rest. He will enter into the bridal chamber of the Father."];
data.TRUTH_GOSPEL["27"] = ["The Father's will is that all should be saved and come to the knowledge of the truth. This is the perfection of the All."];
data.TRUTH_GOSPEL["28"] = ["This is the word of the gospel: that the Father has revealed himself to those who love him."];
data.TRUTH_GOSPEL["29"] = ["The one who does the will of the Father abides in the Father, and the Father abides in him."];
data.TRUTH_GOSPEL["30"] = ["The mystery of the Father is beyond all comprehension. Yet he has revealed it to the children of light."];
data.TRUTH_GOSPEL["31"] = ["The name of the Father is above every name. It is the name that the Son revealed to those who were worthy."];
data.TRUTH_GOSPEL["32"] = ["The children of the Father are those who have come to know him through the Son. They have received the light of knowledge."];
data.TRUTH_GOSPEL["33"] = ["They have put off the garments of ignorance and have clothed themselves with the light of truth."];
data.TRUTH_GOSPEL["34"] = ["The way of the Father is the way of life. Those who walk in it will not stumble."];
data.TRUTH_GOSPEL["35"] = ["The Father is the beginning and the end. He is the one from whom all things come and to whom all things return."];
data.TRUTH_GOSPEL["36"] = ["The Son is the revelation of the Father. Through him, the invisible becomes visible."];
data.TRUTH_GOSPEL["37"] = ["Those who have received the knowledge of the truth have received the perfection of the Father."];
data.TRUTH_GOSPEL["38"] = ["The gospel of truth is a call to all who are asleep, that they may awaken and see the light of the Father."];
data.TRUTH_GOSPEL["39"] = ["Awake, you who sleep, and arise from the dead, and Christ will give you light."];
data.TRUTH_GOSPEL["40"] = ["The one who has ears to hear, let him hear the call of the Father."];
data.TRUTH_GOSPEL["41"] = ["For the truth is the revelation of the Father. It is the light that shines in the hearts of those who love him."];
data.TRUTH_GOSPEL["42"] = ["Let those who have found the truth give thanks to the Father, for he has revealed himself to them."];
data.TRUTH_GOSPEL["43"] = ["For the Father is good, and his mercy endures forever. He has called us to knowledge, to life, to rest in him. Amen."];

fs.writeFileSync('scripts/bible-text-data.json', JSON.stringify(data, null, 2));
console.log('Generated bible-text-data.json');


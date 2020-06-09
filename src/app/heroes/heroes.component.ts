import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
//import { MessageService } from '../message.service';
//import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  constructor(private heroService: HeroService) { }
  //heroes = HEROES;
  /* hero: Hero = {
     id: 1,
     name: 'Windstorm'
   };*/
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        //   this.messageService.add(`HeroService: Liste de tous les héros`);
        this.heroes = heroes
      });
  }
  ngOnInit() {
    this.getHeroes();
  }

  selectedHero: Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    //   this.messageService.add(`HeroService: Selection du héro id=${hero.id}`);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
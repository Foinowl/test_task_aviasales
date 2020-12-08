https://github.com/KosyanMedia/test-tasks/tree/master/assisted_team

## params
- `source` – Откуда;
- `dest` – Куда;
- `back` – Обратный билет, default: bool=False;
- `adult` – Сколько взрослых,default: int=1;
- `child` – Сколько детей,default: int=1.;
- `infant` – Сколько младенцев,default: int=1.;

## examples
- [`/all/?source=dxb&dest=bkk&adult=1&infant=2&back=1`] – все перелеты из DXB в BKK, 1 взрослый, 2 ребенка, в оба конца
- [`/best/?source=dxb&dest=bkk&back=1`] – лучшие/худшие перелеты из DXB в BKK, 1 взрослый,1 ребенок,1 infant в оба конца

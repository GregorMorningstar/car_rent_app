<?php

namespace App\Enum;

enum PostCategoryEnum: string
{
    case GUIDE = 'guide'; // poradnik
    case FINANCE = 'finance'; // finanse
    case COMPARISON = 'comparison'; // porównanie
    case RANKING = 'ranking'; // ranking
    case TRAVEL = 'travel'; // podróże
    case INSURANCE = 'insurance'; // ubezpieczenia
    case ELECTRIC = 'electric'; // elektryczne
    case PREMIUM = 'premium'; // premium
    case RULES = 'rules'; // regulamin
    case SAFETY = 'safety'; // bezpieczeństwo
    case WORK = 'work'; // praca
}

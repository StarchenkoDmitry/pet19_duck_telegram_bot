-bot-name = Duck Game бот

start-registered = Вы уже зарегистрированы.
starr-welcome = Поздравляем, вы новый пользователь.

welcome =
    Ласкаво просимо, {$name}, до {-bot-name}!
    У вас { NUMBER($applesCount) ->
        [0] немає яблук
        [one] є {$applesCount} яблуко
        [few] є {$applesCount} яблука
        *[other] є {$applesCount} яблук
    }.



welcome2 =
    Ласкаво просимо, {$name}, до {-bot-name}!
    У вас { NUMBER($applesCount) ->
        [0] немає яблук
        [one] є {$applesCount} яблуко
        [few] є {$applesCount} яблука
        *[other] є {$applesCount} яблук
    }.

menu-save = Save
help-menu-save = Click { menu-save } to save the {$kek} file.

welcome3 =
    Ласкаво просимо, {$name}, до {-bot-name}!
    У вас { $applesCount ->
        [0] немає яблук
        [one] є {$applesCount} яблуко
        [few] є {$applesCount} яблука
        *[other] є {$applesCount} яблук
    }

start = Hi, how can I /help you?
help =
    Send me some text, and I can make it bold for you.
    You can change my language using the /language command.
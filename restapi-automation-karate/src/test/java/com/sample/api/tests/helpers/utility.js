function () {
    function randomText(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    function returnLength(payload)
    {
        karate.log(payload.length);
        return payload.length;
    }

    function randomEmail() {
        return "bot-inbox+" + randomText(10) + "@sample.com";
    }

    function randomUsPhoneNumber(length) {
        var text = "";
        var possible = "123456789";
        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return "555" + text;
    }

    function wait(waitTime) {
             karate.log('sleeping');
             java.lang.Thread.sleep(waitTime);
    }

    function dateToday() {

            var date = Java.type('org.joda.time.DateTime');
            var today = new date();
//            var tomorrow = today.plusDays(1);

            var formatter = Java.type('org.joda.time.format.DateTimeFormatter')
            var format = Java.type('org.joda.time.format.DateTimeFormat')

            formatter = format.forPattern("yyyy-MM-dd");

            return formatter.print(today);
    }








            function randomLastName() {
                    var lastName =  randomText(8);

                    return lastName;
                }

            function getFakeData(args) {

                                    var faker = Java.type('com.github.javafaker.Faker');
                                    var data = new faker();

                                    if(args == "firstName")
                                          return data.name().firstName();

                                    else if(args == "lastName")
                                          return data.name().lastName();

            }


    return {
        randomEmail: randomEmail,
        randomText: randomText,
        randomUsPhoneNumber: randomUsPhoneNumber,
        wait: wait,
        dateToday : dateToday,
        randomLastName : randomLastName,
        getFakeData : getFakeData,
        returnLength : returnLength
    };
}

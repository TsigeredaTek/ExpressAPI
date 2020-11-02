$(document).ready(function () {
    $('#post').click(() => {
        let userinput = $('#user').val();
        let textinput = $('#text').val();
        $.ajax({
            method: 'POST',
            url: '/api/chirps',
            dataType: 'json',
            data: ({
                user: userinput,
                text: textinput,
            })
        }).done(function (data) {
            console.log(data);
            console.log('great sucess');
        })
    })
    const loadChirps = () => {
        $.ajax({
            method: 'GET',
            url: '/api/chirps/',
            dataType: 'json'
        }).then(data => {
            let chirps = data;
            let keys = Object.keys(chirps);
            for (let key of keys) {
                if (key != "nextid") {
                    let chirpDiv = $(`<div class="chirpRows" id='t${key}'><h1 id="name">${chirps[key].user}</h1>${chirps[key].text}
                    <button type="button" class="btn btn-success" data-toggle="modal" id="s${key}" data-target="#myModal">Update</button> 
                    <button class='btn btn-primary' id="b${key}">X</button></div>`);

                    $('#chirps').append(chirpDiv)

                    $(`#b${key}`).click(() => {
                        $.ajax({
                            type: 'DELETE',
                            url: `/api/chirps/${key}`,
                        }).then((r) => {
                            console.log(`success!`);
                            $(`#t${key}`).remove();
                        }).catch((err) => {
                            console.log(err);
                        });
                    });
                    $(`#s${key}`).click(() => {
                        $('.modal-body').html(`<input id="y${key}"></input>`);
                        console.log(`${chirps[key].text}`);
                        console.log(`y${key}`);
                        $('.modal-footer').html(`<button id="z${key}" type="button" class="btn btn-default" data-dismiss="modal">Save Changes</button>`);
                        $(`#z${key}`).on("click", () => {
                            let changeText = $(`#y${key}`).val();
                            $.ajax({
                                method: 'PUT',
                                url: `/api/chirps/${key}`,
                                dataType: 'json',
                                data: ({
                                    text: changeText
                                })
                            }).done((r) => {
                                console.log('success!');
                            }).fail((err) => {
                                console.log(err);
                            });
                        });
                    });

                }

            }

        });
    }

    loadChirps()

    $('#load').click(() => {
        loadChirps()
    })
});
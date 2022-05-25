{
    // email 형식 정규식
    const idRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    //대소문자+숫자+특수문자 조합으로 8글자이상 20글자 이하
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    const joinFrmElem = document.querySelector('#myJoinFrm');

    // 회원가입 아이디 정규화 예외 처리
    joinFrmElem.w_id.addEventListener('keyup', (e) => {
        const idVal = joinFrmElem.w_id.value;
        const id_box = document.querySelector('#w_id');
        const id_error = document.querySelector('#id-error-alert');

        if (idVal.length < 5) {
            id_error.innerHTML = "5~50자의 이메일 형식으로 입력해주세요."
            id_error.className = "login-error-pink"
            id_box.className = "input-style01 input-style02 error-msg"
            e.preventDefault();
            e.stopPropagation();
        } else if (!idRegex.test(idVal)) {
            id_error.innerHTML = "입력하신 이메일 주소가 형식에 맞지 않습니다. 다시 입력해 주세요."
            id_error.className = "login-error-pink"
            id_box.className = "input-style01 input-style02 error-msg"
            e.preventDefault();
            e.stopPropagation();
        } else {
            id_error.innerHTML = "로그인, 비밀번호 찾기, 알림에 사용되니 정확한 이메일을 입력해 주세요."
            id_error.className = "login-error-gray"
            id_box.className = "input-style01"
        }
        fetch(`/user/idChk/${idVal}`)
            .then(res => res.json())
            .then((data) => {
                setIdChkMsg(data);
            }).catch((e) => {
            console.log(e);
        });
    });

    joinFrmElem.addEventListener('submit', e => {
        const idVal = joinFrmElem.w_id.value;
        if (!idRegex.test(idVal)) {
            e.preventDefault();
        }
    });

    // 회원가입 비밀번호 정규화 예외 처리
    joinFrmElem.w_pw.addEventListener('keyup', (e) => {
        const pwVal = joinFrmElem.w_pw.value;
        const pw_box = document.querySelector('#w_pw');
        const pw_error = document.querySelector('#pw-error-alert');

        if (!pwRegex.test(pwVal)) {
            pw_error.innerHTML = "비밀번호는 8~20자 이내로 영문 대소문자, 숫자, 특수문자 중 3가지 이상 혼용하여 입력해 주세요.연속된 숫자 또는 4자 이상의 동일 문자는 비밀번호로 사용할 수 없습니다."
            pw_error.className = "login-error-pink"
            pw_box.className = "input-style01 input-style02 error-msg"
        } else {
            pw_error.innerHTML = "비밀번호는 8~20자 이내로 영문 대소문자, 숫자, 특수문자 중 3가지 이상 혼용하여 입력해 주세요."
            pw_error.className = "login-error-gray"
            pw_box.className = "input-style01"
        }
    });

    joinFrmElem.addEventListener('submit', e => {
        const pwVal = joinFrmElem.w_pw.value;
        if (!pwRegex.test(pwVal)) {
            e.preventDefault();
        }
    });

    // 비밀번호 보기
    function onPwShow(elem) {
        let type;
        let text;

        if (pw_box.type === 'password') {
            type = 'text';
            text = 'hide';
        } else {
            type = 'password';
            text = 'show';
        }
        pw_box.type = type;
        elem.innerHTML = text;
    }
}
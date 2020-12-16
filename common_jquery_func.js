
function insertYMD_to_select3(
    yearObj   // 년도 관련 select 태그를 관리하는 JQuery 객체
    ,monthObj // 월 관련 select 태그를 관리하는 JQuery 객체
    ,dateObj  // 일 관련 select 태그를 관리하는 JQuery 객체
    ,min_year // 최소 년도
    ,max_year // 최대 년도
    ,year_asc_or_desc//년도의 오름차순(asc) 또는 내림차순(desc)옵션, 1이면 오름차순 2면 내림차순
){

    try{
        // 6번째 매개변수 인자를 안던져 주면 1(오름차순)로 하겠다라는 코딩.
        //------------------------------------------
        // 매개변수 year_asc_or_desc가 undefined 이면 
        // = 즉 매개변수 year_asc_or_desc로 데이터가 안들어오면
        //------------------------------------------
        if(year_asc_or_desc==undefined){
            year_asc_or_desc= 1;
        }
        //------------------------------------------
        // 년도 관련 select 태그를 관리하는 JQuery 객체의 append 메소드를 호출하여
        // 년도 관련 select 태그 내부에 <option value="년도숫자">년도숫자</option>태그 삽입하기
        //------------------------------------------
        for(var i = min_year; i <= max_year; i++){	
            if(year_asc_or_desc==1){
            yearObj.append("<option value="+i+">"+i+"</option>");
            }
            if(year_asc_or_desc==2){
            yearObj.prepend("<option value="+i+">"+i+"</option>");
            }
        }
        //------------------------------------------
        // 월 관련 select 태그를 관리하는 JQuery 객체의 append 메소드를 호출하여
        // 월 관련 select 태그 내부에 <option value="월숫자">월숫자</option>태그 삽입하기
        //------------------------------------------
        for(var i = 1; i <= 12; i++){
            if(i<10){	
                monthObj.append("<option value=0"+i+">0"+i+"</option>");
            }else{
                monthObj.append("<option value="+i+">"+i+"</option>");
            }
        }
        //------------------------------------------
        // 일 관련 select 태그를 관리하는 JQuery 객체의 append 메소드를 호출하여
        // 일 관련 select 태그 내부에 <option value="일숫자">일숫자</option>태그 삽입하기
        //------------------------------------------
        for(var i = 1; i <= 31; i++){	
            if(i<10){	
                dateObj.append("<option value=0"+i+">0"+i+"</option>");
            }else{
                dateObj.append("<option value="+i+">"+i+"</option>");
            }
        }
    }catch(ex){
        alert("insertYMD_to_select3 함수 호출 시 예외발생!\n"+ex.message)
    }
}

//*********************************
// 년, 월에 맞는 일수를 삽입하기 
//*********************************
function insertValidDate(
yearObj // 년도 관련 select 태그를 관리하는 JQuery 객체 
,monthObj
,dateObj
){
        //-----------------------------------------------
        // 년도 관련 태그를 관리하는 JQuery 객체의 val 메소드 호출로
        // 년도 관리 태그의 value 값 얻기 = 선택한 년도 얻기
        //-----------------------------------------------
        var birth_year = yearObj.val();
        //-----------------------------------------------
        // 월 관련 태그를 관리하는 JQuery 객체의 val 메소드 호출로
        // 월 관리 태그의 value 값 얻기 = 선택한 년도 얻기
        //-----------------------------------------------
        var birth_month = monthObj.val();
        //-----------------------------------------------
        // 일 관련 태그를 관리하는 JQuery 객체의 val 메소드 호출로
        // 일 관리 태그의 value 값 얻기 = 선택한 년도 얻기
        //-----------------------------------------------
        var birth_date = dateObj.val();
        //-----------------------------------------------
        // 년과 월이 있으면 = 년과 월이 숫자로 선택되었으면
        //-----------------------------------------------
        if(birth_year!=="" && birth_month!==""){
            //-----------------------------------------------
            // 년과 월에 해당하는 마지막 날짜를 관리하는 Date 객체 생성하고
            // 월일 구하기=즉 선택한 년,월의 마지막 일을 구하기
            //----------------------------------------------- 
            var last_date = new Date(
                parseInt(birth_year,10)
                ,parseInt(birth_month,10)
                ,0).getDate();

                //-----------------------------------------------
                // 일을 표현하는 태그를 JQuery 객체의 empty 메소드를 호출하여
                // 일을 표현하는 태그의 내부를 비우기 = 일을 표현하는 태그의 내부의 option 태그 없애기
                //-----------------------------------------------
                dateObj.empty();
                //-----------------------------------------------
                // 일을 표현하는 태그를 JQuery 객체의 append 메소드를 호출하여
                // 일을 표현하는 태그의 내부에 <option value=''></option>을 막내아들로 삽입하기
                //-----------------------------------------------
                dateObj.append("<option value=''></option>");
                //-----------------------------------------------
                // 일을 표현하는 태그를 JQuery 객체의 append 메소드를 호출하여
                // 일을 표현하는 태그의 내부에 1~마지막일수까지 <option value='일수'>일수</option>을 삽입하기
                //-----------------------------------------------
            for(var i=1; i<=last_date; i++){
                if(i<10){
                    dateObj.append("<option value=0"+i+">0"+i+"</option>");
                }else{
                    dateObj.append("<option value="+i+">"+i+"</option>");
                }
                //------------------------
                // 선택한 일이 비어있지 않으면
                //------------------------
                if(birth_date!=""){
                    //일을 표현하는 태그를 JQuery 객체의 val 메소드를 호출하여 원래 선택한 일을 다시 선택하기
                    dateObj.val(birth_date);
                }
            }
        }

}
function commaInsert(obj){
// keyup 이벤트가 발생한 입력 양식의 value 값, 즉 유저가 입력한 데이터를
        // 자바스크립트 영역으로 가져와 money 변수에 저장.
        var money = obj.val();
        

        
        // 숫자만 골라내서 저장할 변수 선언
        var num = "";

        //1. 입력하는 값의 길이 만큼 돌린다.
        for(var i=0; i<money.length; i++){

            //입력하는 값의 첫번째 인덱스번호부터 즉 첫글자를 골라낸다.
            //charAt(indexNo) 째자리번의 한글자를 골라낸다.
            var i_str= money.charAt(i);

            // money 변수 안의 데이터중 숫자만 골라내어 num 변수에 누적 시킴
            // indexOf(찾을문자) 
            if("0123456789".indexOf(i_str)>=0){

                num = num +i_str
            }
        }
        //2. num 변수 맨앞에 0으로시작하면 0은 제거한다. (단 0 한 개는 놔두자. 0원일 수 있으니)
        while(num.charAt(0)=="0" && num.length>1){
            num = num.substring(1)
        }
            // 위 반복문 코딩은 아래 코딩으로 대체가 가능하다
            // if(num.length>1){
            //     num = parseInt(num,10)+"";
            // }

        //3. comma(,) 를 포함한 최종 문자열을 저장할 변수 선언
        var result = "";
        // num에서 맨 뒤에서부터 하나씩 낚아채서 result
        var cnt = 0;        
        for(var i = num.length-1; i>=0; i--){
            cnt++;
                if(cnt%3==0){
                    result= ","+ num.charAt(i)+result;             
                }else{
                    result = num.charAt(i)+result;
                }
        }
        //맨 앞이 콤마로 시작하면 그 이후 문자를 낚아채 result에 저장
        if(result.charAt(0)==","){
            result = result.substring(1);
        }


       obj.val(result);
        
       $(".msg").text(result);

}
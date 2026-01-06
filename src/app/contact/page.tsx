export default function ContactPage() {
    return (
        <div className="container">
            <h1>문의하기</h1>
            <form>
                <label>
                    이름: <input type="text" name="name" />
                </label>
                <br />
                <label>
                    연락처: <input type="text" name="contact" />
                </label>
                <br />
                <label>
                    문의내용: <textarea name="message" />
                </label>
                <br />
                <button type="submit">제출</button>
            </form>
        </div>
    );
}

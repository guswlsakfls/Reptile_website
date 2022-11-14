
export default function BoardList() {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <group className="mb-3" controlId="exampleForm.ControlInput1">
                    <label>제목</label>
                    <control type="email" placeholder="name@example.com" />
                </group>
                <group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <label>내용</label>
                    <control as="textarea" />
                </group>
            </form>
            <button >작성완료</button>
            <button variant="secondary">취소</button>
        </>
    );
};
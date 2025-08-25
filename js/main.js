async function loadShader(url) {
    const response = await fetch(url);
    return await response.text();
}

async function main() {
    const canvas = document.getElementById('canvas');
    const gl = canvas.getContext('webgl');
    
    if (!gl) {
        alert('WebGLがサポートされていません');
        return;
    }
    
    // シェーダーファイルを読み込み
    const vertexShaderSource = await loadShader('glsl/vertex.glsl');
    const fragmentShaderSource = await loadShader('glsl/fragment.glsl');
    
    // シェーダーをコンパイルする関数
    function createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('シェーダーコンパイルエラー:', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }
    
    // プログラムを作成する関数
    function createProgram(gl, vertexShader, fragmentShader) {
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('プログラムリンクエラー:', gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
            return null;
        }
        return program;
    }
    
    // シェーダーとプログラムを作成
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = createProgram(gl, vertexShader, fragmentShader);
    
    // 属性とユニフォームの場所を取得
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeUniformLocation = gl.getUniformLocation(program, 'u_time');
    
    // バッファーを作成（画面全体を覆う四角形）
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    
    // 描画関数
    function draw(time) {
        time *= 0.001; // ミリ秒を秒に変換
        
        // ビューポートを設定
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        
        // 画面をクリア
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        
        // プログラムを使用
        gl.useProgram(program);
        
        // 属性を有効にして設定
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
        
        // ユニフォームを設定
        gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
        gl.uniform1f(timeUniformLocation, time);
        
        // 描画
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        
        // アニメーションループ
        requestAnimationFrame(draw);
    }
    
    // 描画開始
    requestAnimationFrame(draw);
}

// ページ読み込み後に実行
window.addEventListener('load', main);
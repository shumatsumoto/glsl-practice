precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;

    // float d1 = step(0.2, distance(vec2(0.5), st));
    float d2 = step(0.6, 1.0 - distance(vec2(0.5), st));
    float color =  d2;

    gl_FragColor = vec4(vec3(color), 1.0);
}
let currentActiveSlot = null;
let codeSlotsData = {};

function openModal(modalId) { document.getElementById(modalId).style.display = 'flex'; }
function closeModal(modalId) { document.getElementById(modalId).style.display = 'none'; }
function goBack() { if(confirm("Bạn có muốn lưu dự án không?")) alert("Đã lưu!"); }
function exportVideo() { alert("📥 Đã xuất file MP4 thành công!"); }
function deleteCurrentMedia() {
    if (confirm("🗑️ Bạn có muốn xóa sạch media không?")) {
        document.getElementById('previewBox').innerHTML = `<span class="placeholder-text">Màn hình Preview (Trống)</span><div id="layerOverlay" class="layer-overlay"></div>`;
        codeSlotsData = {};
        alert("Đã xóa xong!");
    }
}
function shareVideoLink() { prompt("🔗 Link chỉnh sửa video của bạn:", "https://videostarpro.app/edit/" + Math.random().toString(36).substring(7)); }
function changeMenuBackground(event) {
    const file = event.target.files[0];
    if (!file) return;
    const bgURL = URL.createObjectURL(file);
    document.body.style.backgroundImage = `linear-gradient(rgba(24,24,32,0.85), rgba(24,24,32,0.85)), url('${bgURL}')`;
    alert("🖼️ Đã đổi ảnh nền Menu!");
}
function addBeatMarker(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const percentage = ((event.clientX - rect.left) / rect.width) * 100;
    const marker = document.createElement('div');
    marker.className = 'beat-marker';
    marker.style.left = percentage + '%';
    event.currentTarget.appendChild(marker);
    alert("🎵 Đã thêm điểm Beat!");
}
function triggerImportQR() { document.getElementById('qrFileInput').click(); }
function processQRImage(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width; canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            generateSlots(6);
            openModal('slotManagerModal');
            alert("🔥 Đã nhập code thành công! Hãy nạp media vào các ô.");
        }
        img.src = e.target.result;
    }
    reader.readAsDataURL(file);
}
function generateSlots(count) {
    const container = document.getElementById('slotGridContainer');
    container.innerHTML = "";
    for (let i = 1; i <= count; i++) {
        const slot = document.createElement('div');
        slot.className = codeSlotsData[i] ? "slot-item filled" : "slot-item";
        slot.id = "slotBtn-" + i;
        slot.innerHTML = `<span>Ô số ${i}</span><b>${codeSlotsData[i] ? '✓ Đã có' : '+ Thêm'}</b>`;
        slot.onclick = function() { currentActiveSlot = i; document.getElementById('slotMediaInput').click(); };
        container.appendChild(slot);
    }
}
function assignSlotMedia(event) {
    const file = event.target.files[0];
    if (!file || !currentActiveSlot) return;
    const fileURL = URL.createObjectURL(file);
    codeSlotsData[currentActiveSlot] = fileURL;
    const slotBtn = document.getElementById("slotBtn-" + currentActiveSlot);
    if (slotBtn) { slotBtn.className = "slot-item filled"; slotBtn.innerHTML = `<span>Ô số ${currentActiveSlot}</span><b>✓ Xong</b>`; }
    if (currentActiveSlot === 1) { document.getElementById('previewBox').innerHTML = `<img src="${fileURL}" style="width:100%; height:100%; object-fit:cover;"><div id="layerOverlay" class="layer-overlay"></div>`; }
    alert("Đã thêm vào Ô số " + currentActiveSlot);
    currentActiveSlot = null;
}
function saveCustomCode() { alert("💾 Đã lưu code mới!"); closeModal('createCodeModal'); }
function editCustomCodeTitle() { alert("Đã đổi tiêu đề code!"); }
function deleteCustomCode() { alert("Đã xóa code!"); closeModal('createCodeModal'); }
function applyPhotoToVideo(name) { closeModal('photoToVideoModal'); alert("🎞️ Đã áp dụng: " + name); }
function applyTrim(name) { closeModal('trimModal'); alert("✂️ Đã thực hiện: " + name); }
function applyZoom(zoomLevel) { closeModal('zoomModal'); document.getElementById('previewBox').style.transform = "scale(" + zoomLevel + ")"; }
function openTextPrompt() { const t = prompt("🔤 Nhập văn bản:", "VIDEO STAR PRO"); if(t) document.getElementById('layerOverlay').innerText = t; }
function applyIconSticker(n) { closeModal('iconModal'); alert("🏷️ Đã thêm sticker: " + n); }
function apply3DEffect(n) { closeModal('d3Modal'); alert("📦 Đã áp dụng 3D: " + n); }
function applyMirrorEffect(n) { closeModal('mirrorModal'); alert("🪞 Đã áp dụng gương: " + n); }
function applyTemplate(n) { closeModal('templateModal'); alert("🔥 Đã áp dụng mẫu: " + n); }
function applyImageMotion(n) { closeModal('motionModal'); alert("🚀 Đã áp dụng chuyển động: " + n); }
function applyEffect(n) { closeModal('fxModal'); alert("✨ Đã áp dụng FX: " + n); }
function applyColorFilter(n) { closeModal('colorModal'); alert("🎨 Đã áp dụng màu: " + n); }
function applyTransition(n) { closeModal('transitionModal'); alert("🎞️ Đã áp dụng chuyển cảnh: " + n); }
function changeAspect(rClass, rName) { closeModal('aspectModal'); document.getElementById('previewBox').className = "video-preview-box " + rClass; }
function applySpeed(n) { closeModal('speedModal'); alert("⏳ Đã chỉnh tốc độ: " + n); }
function applyChromaKey(n) { closeModal('chromaModal'); alert("🟢 Đã xóa phông: " + n); }
function triggerImportMedia() { document.getElementById('mediaFileInput').click(); }
function processMediaFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    const fileURL = URL.createObjectURL(file);
    document.getElementById('previewBox').innerHTML = `<img src="${fileURL}" style="width:100%; height:100%; object-fit:cover;"><div id="layerOverlay" class="layer-overlay"></div>`;
    alert("📂 Đã nhập media!");
      }
  
